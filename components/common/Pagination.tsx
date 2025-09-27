"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Pagination as AntdPagination } from "antd";

const Pagination = ({
  page,
  limit,
  category_id,
  search_keyword,
  meta_data,
}: any) => {
  const router = useRouter();

  const handlePageChange = (newPage: number, newPageSize?: number) => {
    router.push(
      `?page=${newPage}&limit=${newPageSize || limit}&q=${search_keyword}&category=${category_id}`,
    );
  };

  return (
    <div className="flex justify-end mt-6">
      <AntdPagination
        current={Number(page)}
        pageSize={Number(limit)}
        total={meta_data.filtered_data}
        showSizeChanger={false}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default Pagination;
