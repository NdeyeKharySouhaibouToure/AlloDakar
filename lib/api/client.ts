// Centralized API client for consistent error handling

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message)
    this.name = "APIError"
  }
}

export async function apiRequest<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new APIError(data.error || "Request failed", response.status)
    }

    return data
  } catch (error) {
    if (error instanceof APIError) {
      throw error
    }
    throw new APIError("Network error", 500)
  }
}
