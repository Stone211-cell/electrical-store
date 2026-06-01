"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconTrash, IconEdit, IconPlus, IconCheck, IconX } from "@tabler/icons-react";
import type { Category } from "@prisma/client";
import axios from "axios";

export function CategoryManager({ initialCategories }: { initialCategories: Category[] }) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const router = useRouter();

  const handleAdd = async () => {
    if (!newName.trim()) return;
    try {
      const res = await axios.post<Category>("/api/categories", { name: newName });
      setCategories([...categories, res.data]);
      setNewName("");
      setIsAdding(false);
      router.refresh();
    } catch (err) {
      alert("Failed to add category");
    }
  };

  const handleEdit = async (id: string) => {
    if (!editName.trim()) return;
    try {
      const res = await axios.put<Category>(`/api/categories/${id}`, { name: editName });
      setCategories(categories.map((c) => (c.id === id ? res.data : c)));
      setEditingId(null);
      setEditName("");
      router.refresh();
    } catch (err) {
      alert("Failed to update category");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("ยืนยันการลบหมวดหมู่นี้? (อาจกระทบกับสินค้าที่อยู่ในหมวดหมู่นี้)")) return;
    try {
      await axios.delete(`/api/categories/${id}`);
      setCategories(categories.filter((c) => c.id !== id));
      router.refresh();
    } catch (err) {
      alert("Failed to delete category");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <h2 className="text-xl font-bold text-slate-800">จัดการหมวดหมู่สินค้า</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-sky-600 transition-colors shadow-sm"
        >
          <IconPlus size={16} />
          เพิ่มหมวดหมู่
        </button>
      </div>

      <div className="p-6">
        {isAdding && (
          <div className="flex gap-2 mb-4 p-4 bg-sky-50 rounded-xl border border-sky-100">
            <input
              autoFocus
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="ชื่อหมวดหมู่..."
              className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500"
            />
            <button
              onClick={handleAdd}
              className="bg-sky-500 text-white px-4 rounded-lg hover:bg-sky-600 transition-colors flex items-center justify-center"
            >
              <IconCheck size={18} />
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="bg-white border border-slate-200 text-slate-500 px-4 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center"
            >
              <IconX size={18} />
            </button>
          </div>
        )}

        <div className="space-y-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:border-sky-200 hover:bg-sky-50/50 transition-colors"
            >
              {editingId === category.id ? (
                <div className="flex flex-1 gap-2 mr-4">
                  <input
                    autoFocus
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500"
                  />
                  <button
                    onClick={() => handleEdit(category.id)}
                    className="text-emerald-600 hover:bg-emerald-50 p-2 rounded-lg"
                  >
                    <IconCheck size={18} />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-slate-400 hover:bg-slate-100 p-2 rounded-lg"
                  >
                    <IconX size={18} />
                  </button>
                </div>
              ) : (
                <div className="font-semibold text-slate-700">{category.name}</div>
              )}

              {editingId !== category.id && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setEditingId(category.id);
                      setEditName(category.name);
                    }}
                    className="p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                  >
                    <IconEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <IconTrash size={18} />
                  </button>
                </div>
              )}
            </div>
          ))}
          {categories.length === 0 && !isAdding && (
            <div className="text-center py-10 text-slate-400">ยังไม่มีหมวดหมู่</div>
          )}
        </div>
      </div>
    </div>
  );
}
