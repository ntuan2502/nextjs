"use client";

import { useEffect, useState } from "react";
import { fetchUsers } from "@/lib/graphql";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSocketNotification } from "@/hooks/useSocket";

type User = {
  id: string;
  email: string;
  fullname: string;
  username: string | null;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useSocketNotification();

  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data.items);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Users</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Fullname</TableHead>
            <TableHead>Username</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.fullname}</TableCell>
              <TableCell>{user.username ?? "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
