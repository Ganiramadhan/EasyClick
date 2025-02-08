import { useState, useEffect } from "react";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { FiX } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

export default function ProductModal({ open, handleCloseModal, onSubmit, editingProduct }) {
  const { register, handleSubmit, setValue, reset, watch } = useForm();
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (editingProduct) {
      setValue("name", editingProduct.name);
      setValue("price", editingProduct.price);
      setValue("description", editingProduct.description);
      setPreviewImage(editingProduct.image ? `/storage/${editingProduct.image}` : null);
    } else {
      reset();
      setPreviewImage(null);
    }
  }, [editingProduct, setValue, reset]);

  return (
    <Dialog open={open} handler={handleCloseModal} size="md" className="bg-white rounded-xl shadow-lg">
      {/* Header Modal */}
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-700">{editingProduct ? "Edit Produk" : "Tambah Produk"}</h3>
        <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
          <FiX size={18} />
        </button>
      </div>
      
      <DialogBody className="px-5 py-3">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Nama Produk</label>
            <input type="text" {...register("name")} className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-300" placeholder="Masukkan nama produk" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Harga (IDR)</label>
            <input type="number" {...register("price")} className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-300" placeholder="Masukkan harga" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Deskripsi</label>
            <textarea {...register("description")} className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-300" placeholder="Deskripsi produk" rows={2} required></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Gambar Produk</label>
            <input type="file" className="mt-1 block w-full text-sm text-gray-600 border cursor-pointer focus:outline-none" accept="image/*" 
              onChange={(e) => {
                const file = e.target.files[0];
                setValue("image", file);
                setPreviewImage(file ? URL.createObjectURL(file) : null);
              }}
            />

            {previewImage && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="mt-3 flex justify-center">
                <img src={previewImage} className="w-40 h-40 rounded-lg border shadow-md object-cover" alt="Preview Gambar" />
              </motion.div>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={handleCloseModal} className="px-3 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition">Batal</button>
            <button type="submit" className="px-3 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition">{editingProduct ? "Update" : "Tambah"} Produk</button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
}