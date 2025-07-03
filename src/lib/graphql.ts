import axios from "axios";

export async function fetchUsers(page = 1, limit = 10) {
  const response = await axios.post(
    "http://localhost:3001/graphql",
    {
      query: `
        query PaginatedUsers($page: Int, $limit: Int) {
          paginatedUsers(page: $page, limit: $limit) {
            items {
              id
              email
              fullname
              username
            }
            totalCount
            totalPages
            page
            limit
          }
        }
      `,
      variables: { page, limit },
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.data.paginatedUsers;
}
