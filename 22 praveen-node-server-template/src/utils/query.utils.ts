/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';

type PrismaModel = {
  count: (args?: { where: any }) => Promise<number>;
  findMany: (args: any) => Promise<any[]>;
};

interface QueryOptions {
  page: number;
  limit: number;
  search?: string;
  sort?: string;
  filter?: Record<string, string>;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

type QueryConditions = {
  where: Record<string, any>;
  orderBy?: Record<string, 'asc' | 'desc'>;
  skip?: number;
  take?: number;
};

export async function applyQueryOptions<T>(
  req: Request,
  model: PrismaModel,
  searchFields: string[],
  sortableFields: string[],
): Promise<PaginatedResponse<T>> {
  const options: QueryOptions = {
    page: Math.max(1, Number(req.query.page) || 1),
    limit: Math.min(100, Math.max(1, Number(req.query.limit) || 10)),
    search: req.query.search as string | undefined,
    sort: req.query.sort as string | undefined,
    filter: req.query.filter as Record<string, string> | undefined,
  };

  const queryOptions: QueryConditions = { where: {} };

  // Apply filtering
  if (options.filter) {
    Object.entries(options.filter).forEach(([key, value]) => {
      queryOptions.where[key] = { equals: value };
    });
  }

  // Apply search
  if (options.search) {
    queryOptions.where.OR = searchFields.map((field) => ({
      [field]: { contains: options.search, mode: 'insensitive' as const },
    }));
  }

  // Apply sorting
  if (options.sort) {
    const [field, order] = options.sort.split(':');
    if (sortableFields.includes(field)) {
      queryOptions.orderBy = { [field]: order === 'desc' ? 'desc' : 'asc' };
    }
  }

  // Get total count
  const totalCount = await model.count({ where: queryOptions.where });

  // Apply pagination
  queryOptions.skip = (options.page - 1) * options.limit;
  queryOptions.take = options.limit;

  // Execute query
  const results = await model.findMany(queryOptions);

  // Calculate pagination info
  const totalPages = Math.ceil(totalCount / options.limit);
  const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${
    req.path
  }`;
  const next =
    options.page < totalPages
      ? `${baseUrl}?page=${options.page + 1}&limit=${options.limit}`
      : null;
  const previous =
    options.page > 1
      ? `${baseUrl}?page=${options.page - 1}&limit=${options.limit}`
      : null;

  return {
    count: totalCount,
    next,
    previous,
    results,
    currentPage: options.page,
    pageSize: options.limit,
    totalPages,
  };
}
