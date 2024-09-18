// import { Request } from "express";
// import { PrismaClient, Prisma } from "@prisma/client";

// type ModelDelegate = PrismaClient[keyof PrismaClient];

// type FindManyResult<T> = T extends {
//   findMany: (...args: any) => infer R;
// }
//   ? R extends Promise<infer U>
//     ? U
//     : never
//   : never;

// export const applyQueryOptions = async <TModel extends ModelDelegate>(
//   req: Request,
//   model: TModel,
//   searchFields: string[],
//   sortableFields: string[]
// ): Promise<PaginationResult<FindManyResult<TModel>[number]>> => {
//   const page = parseInt(req.query.page as string) || 1;
//   const limit = parseInt(req.query.limit as string) || 10;
//   const search = req.query.search as string;
//   const sort = req.query.sort as string;
//   const filter = req.query.filter as { [key: string]: string };

//   const queryOptions: Prisma.Args<TModel, "findMany"> = {} as Prisma.Args<
//     TModel,
//     "findMany"
//   >;

//   // Apply filtering
//   if (filter) {
//     queryOptions.where = Object.entries(filter).reduce((acc, [key, value]) => {
//       (acc as any)[key] = { equals: value };
//       return acc;
//     }, {} as Prisma.Args<TModel, "findMany">["where"]);
//   }

//   // Apply search
//   if (search) {
//     const searchQuery = searchFields.map((field) => ({
//       [field]: { contains: search, mode: "insensitive" as const },
//     }));
//     queryOptions.where = {
//       ...queryOptions.where,
//       OR: searchQuery,
//     };
//   }

//   // Apply sorting
//   if (sort) {
//     const [field, order] = sort.split(":");
//     if (sortableFields.includes(field)) {
//       queryOptions.orderBy = {
//         [field]: order === "desc" ? "desc" : "asc",
//       };
//     }
//   }

//   // Get total count
//   const totalCount = await (model as any).count({
//     where: queryOptions.where,
//   });

//   // Apply pagination
//   const skip = (page - 1) * limit;
//   queryOptions.skip = skip;
//   queryOptions.take = limit;

//   // Execute query
//   const results = await (model as any).findMany(queryOptions);

//   // Calculate pagination info
//   const totalPages = Math.ceil(totalCount / limit);
//   const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}${
//     req.path
//   }`;
//   const next =
//     page < totalPages ? `${baseUrl}?page=${page + 1}&limit=${limit}` : null;
//   const previous =
//     page > 1 ? `${baseUrl}?page=${page - 1}&limit=${limit}` : null;
//   const start_sr_no = results.length === 0 ? 0 : (page - 1) * limit + 1;

//   return {
//     count: totalCount,
//     next,
//     previous,
//     results,
//     current_page: page,
//     page_size: limit,
//     total_pages: totalPages,
//     start_sr_no: start_sr_no,
//     end_sr_no: Math.min(page * limit, totalCount),
//   };
// };
