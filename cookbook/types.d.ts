export interface ServerError {
  log: {
    err: string;
  };
  status: number;
  message: string;
}

export interface RecipeBody {
  id?: number;
  name?: string;
  description?: string;
}
