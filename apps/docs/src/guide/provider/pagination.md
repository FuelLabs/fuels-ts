# Pagination

Pagination is highly efficient when dealing with large sets of data. Because of this some methods from the `Provider` class support [GraphQL cursor pagination](https://graphql.org/learn/pagination/), allowing you to efficiently navigate through data chunks.

## Pagination Arguments

The pagination arguments object is used to specify the range of data you want to retrieve. It includes the following properties:

- `after`: A cursor pointing to a position after which you want to retrieve items.
- `first`: The number of items to retrieve after the specified cursor. This is used in conjunction with the `after` argument.
- `before`: A cursor pointing to a position before which you want to retrieve items.
- `last`: The number of items to retrieve before the specified cursor. This is used in conjunction with the `before` argument.

<<< @./snippets/pagination.ts#pagination-args{ts:line-numbers}

## Page Info

The `pageInfo` object is included in the GraphQL response for requests that support cursor pagination. It provides crucial metadata about the current page of results, allowing you to understand the pagination state and determine if there are more items to fetch before or after the current set.

- `endCursor`: A cursor representing the last item in the current set of results. It should be used as the `after` argument in subsequent queries to fetch the next set of items.
- `hasNextPage`: A boolean indicating whether there are more items available after the current set.
- `startCursor`: A cursor representing the first item in the current set of results. It should be used as the `before` argument in subsequent queries to fetch the previous set of items.
- `hasPreviousPage`: A boolean indicating whether there are more items available before the current set.

<<< @./snippets/pagination.ts#pagination-page-info{ts:line-numbers}

## Using Pagination

One of the methods that supports pagination is the `getCoins` method. This method receives three parameters:

- `address`: The owner's account address
- `assetId`: The asset ID of the coins (optional)
- `paginationArgs`: The pagination arguments (optional)

### Basic Pagination

Here is how you can use the `getCoins` method with pagination:

<<< @./snippets/pagination.ts#pagination-next-page{ts:line-numbers}

### Navigating to the Previous Page

You can also use the `paginationArgs` to navigate to the previous page of results:

<<< @./snippets/pagination.ts#pagination-previous-page{ts:line-numbers}

## Valid Combinations

- Forward Pagination:

  Use `after` with `first` to retrieve items following a cursor.

<<< @./snippets/pagination.ts#pagination-forward-pagination{ts}

- Backward Pagination:

  Use `before` with `last` to retrieve items preceding a cursor.

<<< @./snippets/pagination.ts#pagination-backward-pagination{ts}

## Default Behavior

If neither `assetId` nor `paginationArgs` are provided, the `getCoins` method will default to the base asset ID and return the first 100 items:

<<< @./snippets/pagination.ts#pagination-default-args{ts:line-numbers}
