import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@material-tailwind/react";
import DataTable from "react-data-table-component";
import { FiEdit, FiTrash2, FiPlus, FiSearch, FiX } from "react-icons/fi";
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";
import { useForm } from "react-hook-form";
import ProductModal from "./ProductModal";

export default function Products({ products, flash }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const { setValue, reset } = useForm();

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

  const handlePageChange = (page) => setCurrentPage(page);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete",
    });

    if (!result.isConfirmed) return;

    Inertia.delete(`/product/delete/${id}`, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => Swal.fire("Deleted!", "Product has been removed.", "success"),
      onError: () => Swal.fire("Error!", "Failed to delete the product.", "error"),
    });
  };

  const handleOpenModal = useCallback((product = null) => {
    setEditingProduct(product);
    reset();
    if (product) {
      setValue("name", product.name);
      setValue("price", product.price);
      setValue("description", product.description);
      setPreviewImage(product.image ? `/storage/${product.image}` : null);
      setValue("stock", product.stock);
      setValue("discount", product.discount);
      setValue("rating", product.rating);
    } else {
      setPreviewImage(null);
    }
    setOpen(true);
  }, [reset, setValue]);

  const handleCloseModal = () => {
    setOpen(false);
    setEditingProduct(null);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("stock", data.stock);
    formData.append("discount", data.discount);
    formData.append("rating", data.rating);

    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    const url = editingProduct ? `/product/${editingProduct.id}` : "/product";
    Inertia.post(url, formData, {
      preserveState: true,
      preserveScroll: true,
      forceFormData: true,
    });

    handleCloseModal();
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (row) => {
    handleOpenModal(row);
  };

  const columns = [
    {
      name: "#",
      selector: (_, index) => (currentPage - 1) * rowsPerPage + index + 1,
      sortable: false,
      width: "5%",
    },
    { name: "Name", selector: (row) => row.name, sortable: true, width: "25%" },
    { name: "Stock", selector: (row) => row.stock, sortable: true, width: "10%" },
    {
    name: "Image",
      cell: (row) => (
        <img
          src={`/storage/${row.image}`}
          alt={row.name}
          className="w-16 h-16 object-cover rounded-md"
        />
      ),
      width: "20%",
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
      ignoreRowClick: true,
    },
  ];

  return (
    <AppLayout header={<h2 className="text-xl font-semibold text-gray-800">List Products</h2>}>
      <Head title="Products" />
      <div className="flex justify-between items-center mb-4">
        <Button color="blue" variant="filled" className="flex items-center gap-2 px-3 py-2 text-sm" onClick={() => handleOpenModal()}>
          <FiPlus className="text-lg" /> Add Data
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
      <DataTable columns={columns} data={filteredProducts} pagination highlightOnHover responsive onChangePage={handlePageChange} />
      <ProductModal open={open} handleCloseModal={handleCloseModal} onSubmit={onSubmit} editingProduct={editingProduct} />
    </AppLayout>
  );
}
