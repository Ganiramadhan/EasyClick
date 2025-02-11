import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "@material-tailwind/react";
import DataTable from "react-data-table-component";
import { FiTrash2, FiSearch, FiX } from "react-icons/fi";
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";

export default function Products({ orders, flash }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

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

  const handleDelete = useCallback(async (id) => {
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

    Inertia.delete(`/order/delete/${id}`, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () =>
        Swal.fire("Dihapus!", "Pesanan telah dihapus.", "success"),
      onError: () => Swal.fire("Gagal!", "Gagal menghapus pesanan.", "error"),
    });
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) =>
      order.order_num.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [orders, searchTerm]);

  const getStatusBadge = (status) => {
    let colorClass = "bg-gray-500"; 
    if (status === "Pending") colorClass = "bg-gray-500";
    else if (status === "Paid") colorClass = "bg-green-500";
    else if (status === "In Progress") colorClass = "bg-blue-500";

    return (
      <span className={`text-white px-3 py-1 rounded-md text-sm ${colorClass}`}>
        {status}
      </span>
    );
  };

  const columns = [
    {
      name: "#",
      selector: (_, index) => (currentPage - 1) * rowsPerPage + index + 1,
      sortable: false,
      width: "10%",
    },
    {
      name: "Nomor Pesanan",
      selector: (row) => row.order_num,
      sortable: true,
      width: "30%",
    },
    {
      name: "Total Harga",
      selector: (row) => formatRupiah(row.total_price),
      sortable: true,
      width: "30%",
    },
    {
      name: "Status",
      cell: (row) => getStatusBadge(row.status),
      sortable: true,
      width: "20%",
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="flex gap-2">
          <Button color="red" variant="filled" onClick={() => handleDelete(row.id)}>
            <FiTrash2 size={15} />
          </Button>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <AppLayout header={<h2 className="text-xl font-semibold text-gray-800">List Orders</h2>}>
      <Head title="Orders" />
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-64">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari..."
            className="w-full p-2 pl-10 pr-10 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <FiX
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
              onClick={() => setSearchTerm("")}
            />
          )}
        </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredOrders}
        pagination
        paginationServer
        highlightOnHover
        responsive
        onChangePage={handlePageChange}
      />
    </AppLayout>
  );
}
