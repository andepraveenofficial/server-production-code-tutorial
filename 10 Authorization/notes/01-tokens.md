# Tokens

1. accessToken
2. refreshToken

Store these tokens in Cookie.

### 1. accessToken

- Short-lived token used to authenticate and authorize API requests
- Typically expires quickly (minutes to hours)
- Sent with each API request to prove authentication
- Contains user identity and permissions
- Short-lived token used to access protected resources
- Sent with each request to authenticate the user
- Usually expires quickly (minutes to hours)
- Provides temporary, limited access to specific resources

### 2. refreshToken

- Long-lived token used to obtain new access tokens
- Has a longer expiration period (days to weeks)
- Stored securely on the client side
- Used to request a new access token when the current one expires
- Long-lived token used to obtain new access tokens
- Stored securely on the client side
- Has a longer expiration time (days to weeks)
- Used to request a new access token when the current one expires

### The main differences are:

- Purpose: Access tokens are for immediate resource access, while refresh tokens are for obtaining new access tokens.
- Lifespan: Access tokens are short-lived, refresh tokens are long-lived.
- Usage frequency: Access tokens are used frequently, refresh tokens are used only when needed to get new access tokens.
- Security: Refresh tokens require stronger protection due to their longer lifespan and higher sensitivity.

### Cookie

- `cookie-parser`
- Cookie is used to set data on client-side.
