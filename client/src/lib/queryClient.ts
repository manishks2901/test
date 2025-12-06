import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

function buildUrlFromQueryKey(queryKey: readonly unknown[]): string {
  const [base, ...rest] = queryKey;
  if (!base) {
    throw new Error("queryKey must include a base URL");
  }

  let url = String(base);
  const pathSegments: string[] = [];
  let params: Record<string, string> = {};

  for (const part of rest) {
    if (part == null) continue;
    if (typeof part === "object" && !Array.isArray(part)) {
      for (const [key, value] of Object.entries(part)) {
        if (value === undefined || value === null) continue;
        params[key] = String(value);
      }
    } else {
      pathSegments.push(encodeURIComponent(String(part)));
    }
  }

  if (pathSegments.length > 0) {
    url = `${url.replace(/\/$/, "")}/${pathSegments.join("/")}`;
  }

  const hasExistingQuery = url.includes("?");
  const paramString = new URLSearchParams(params).toString();
  if (paramString) {
    url = `${url}${hasExistingQuery ? "&" : "?"}${paramString}`;
  }

  return url;
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = buildUrlFromQueryKey(queryKey);
    const res = await fetch(url, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
