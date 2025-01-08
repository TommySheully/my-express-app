export interface User {
  id: string;
  name: string;
  email: string;
}

export const users: User[] = [
  { id: crypto.randomUUID(), name: 'Alice', email: 'alice@example.com' },
  { id: crypto.randomUUID(), name: 'Bob', email: 'bob@example.com' },
  { id: 'Bob2', name: 'Bob2', email: 'bob@example.com' },
  { id: 'Bob3', name: 'Bob3', email: 'bob@example.com' },
  { id: 'Bob4', name: 'Bob4', email: 'bob@example.com' },
  { id: 'Bob5', name: 'Bob5', email: 'bob@example.com' }
]
