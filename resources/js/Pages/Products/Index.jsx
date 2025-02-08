import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Button, Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import DataTable from "react-data-table-component";
import { FiEdit, FiTrash2, FiPlus, FiSearch, FiX } from "react-icons/fi";
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

export default function Products({ products, flash }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; 
  const { register, handleSubmit, setValue, reset, watch } = useForm();

  useEffect(() => {
    if (flash?.success) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: flash.success,
        timer: 3000,
        showConfirmButton: false,
      });
    }
  }, [flash]);

  const formatRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Tindakan ini tidak dapat dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus",
    });

    if (!result.isConfirmed) return;

    Inertia.delete(`/product/delete/${id}`, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        Swal.fire("Berhasil!", "Produk telah dihapus.", "success");
      },
      onError: () => {
        Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus produk.", "error");
      }
    });
};


const handleOpenModal = (product = null) => {
  setEditingProduct(product);
  reset(); 

  if (product) {
    setValue("name", product.name);
    setValue("price", product.price);
    setValue("description", product.description);

    setPreviewImage(product.image ? `/storage/${product.image}` : null);
  } else {
    setPreviewImage(null); 
  }

  setOpen(true);
};


  const handleCloseModal = () => {
    setOpen(false);
    setEditingProduct(null);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
  
    if (data.image instanceof File) {
      formData.append("image", data.image);
    }
  
    if (editingProduct) {
      Inertia.post(`/product/${editingProduct.id}`, formData, {
        preserveState: true,
        preserveScroll: true,
        forceFormData: true, 
      });
    } else {
      Inertia.post("/product", formData, {
        preserveState: true,
        preserveScroll: true,
        forceFormData: true,
      });
    }
  
    handleCloseModal();
  };
  

  const columns = [
    { 
        name: "#", 
        selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1, 
        sortable: false, 
        width: "5%" 
    },
    { name: "Name", selector: (row) => row.name, sortable: true, width: "25%" },
    { 
        name: "Image", 
        cell: (row) => (
            <img 
                src={`/storage/${row.image}`} 
                alt={row.name} 
                className="w-16 h-16 object-cover rounded-md" 
            />
        ), 
        width: "30%" 
    },
    { name: "Price", selector: (row) => formatRupiah(row.price), sortable: true, width: "20%" },
    {
        name: "Actions",
        cell: (row) => (
            <div className="flex gap-2">
                <Button color="blue" variant="filled" onClick={() => handleOpenModal(row)}>
                    <FiEdit size={15} />
                </Button>
                <Button color="red" variant="filled" onClick={() => handleDelete(row.id)}>
                    <FiTrash2 size={15} />
                </Button>
            </div>
        ),
        ignoreRowClick: true
    }
];


  return (
    <AppLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">List Products</h2>}>
      <Head title="Products" />

      <div className="flex justify-between items-center mb-4">
        <Button color="blue" variant="filled" className="flex items-center gap-2 px-3 py-2 text-sm" onClick={() => handleOpenModal()}>
          <FiPlus className="text-lg" />
          Add Data
        </Button>
        <div className="relative w-64">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 pl-10 pr-10 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <FiX className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600" onClick={() => setSearchTerm("")} />
          )}
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))} 
        pagination 
        highlightOnHover 
        responsive
        onChangePage={handlePageChange} 
    />

      {/* Modal */}
      <Dialog open={open} handler={handleCloseModal} size="md" className="bg-white rounded-xl shadow-lg">
        {/* Header Modal */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-700">{editingProduct ? "Edit Produk" : "Tambah Produk"}</h3>
          <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
            <FiX size={18} />
          </button>
        </div>

      {/* Add and Update*/}
      <DialogBody className="px-5 py-3">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Input Nama Produk */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Nama Produk</label>
            <input
              type="text"
              {...register("name")}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none shadow-sm"
              placeholder="Masukkan nama produk"
              required
            />
          </div>

          {/* Input Harga Produk */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Harga (IDR)</label>
            <input
              type="number"
              {...register("price")}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none shadow-sm"
              placeholder="Masukkan harga"
              required
            />
          </div>

          {/* Input Deskripsi */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Deskripsi</label>
            <textarea
              {...register("description")}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none shadow-sm"
              placeholder="Deskripsi produk"
              rows={2}
              required
            ></textarea>
          </div>
          {/* Input Gambar & Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Gambar Produk</label>
            <input
              type="file"
              className="mt-1 block w-full text-sm text-gray-600 border border-gray-300 cursor-pointer focus:outline-none"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0]; // Ambil file pertama
                setValue("image", file); // Set nilai di React Hook Form
                setPreviewImage(file ? URL.createObjectURL(file) : null); 
              }}
            />

            {/* Tampilkan Preview Gambar */}
            {previewImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-3 flex justify-center"
              >
                <img 
                  src={previewImage}
                  className="w-40 h-40 rounded-lg border shadow-md object-cover"
                  alt="Preview Gambar"
                />
              </motion.div>
            )}
          </div>
          {/* Tombol Submit */}
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={handleCloseModal} className="px-3 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
              Batal
            </button>
            <button type="submit" className="px-3 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition">
              {editingProduct ? "Update" : "Tambah"} Produk
            </button>
          </div>
        </form>
      </DialogBody>
      </Dialog>

    </AppLayout>
  );
}
