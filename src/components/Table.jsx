import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import PropTypes from "prop-types";
import React from "react";
import Button from "./Button";

const fallbackData = [];

const Table = React.memo(({ columnsDef, data, pageIndex, pageSize, hasMoreData, setPageIndex, setPageSize }) => {
    const table = useReactTable({
        data: data ?? fallbackData,
        columns: columnsDef,
        getCoreRowModel: getCoreRowModel(),
        debugTable: false,
        manualPagination: true,
        state: {
            pagination: {
                pageIndex,
                pageSize
            }
        },
        onPaginationChange: (updater) => {
            const nextPagination =
                typeof updater === "function" ? updater({ pageIndex, pageSize }) : updater;
            setPageIndex(nextPagination.pageIndex);
            setPageSize(nextPagination.pageSize);
        },
    });

    return (
        <div className="my-4 border border-slate-300 border-none rounded-xl overflow-clip shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-min items-center border-collapse table-fixed">
                    <thead className="min-w-min">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        style={{ width: header.getSize() !== 150 ? header.getSize() : "auto" }}
                                        className="min-w-max px-12 align-middle border border-none py-6 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-white text-slate-400 border-slate-300"
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className="min-w-min cursor-pointer"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        style={{ width: cell.column.getSize() }}
                                        className="min-w-max border-t-0 px-12 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-6 text-slate-500 bg-white"
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between items-center bg-white px-12 py-6 border-t">
                    <Button
                        variant="outline"
                        onClick={() => {
                            setPageIndex((old) => Math.max(old - 1, 0));
                        }}
                        disabled={pageIndex === 0}>
                        Previous
                    </Button>
                    <span className="text-slate-900">Page {table.getState().pagination.pageIndex + 1}</span>
                    <Button
                        variant="outline"
                        onClick={() => {
                            setPageIndex((old) => old + 1);
                        }}
                        disabled={!hasMoreData}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
});

Table.displayName = "Table";

Table.propTypes = {
    data: PropTypes.array.isRequired,
    columnsDef: PropTypes.array.isRequired,
    pageSize: PropTypes.number.isRequired,
    pageIndex: PropTypes.number.isRequired,
    hasMoreData: PropTypes.bool.isRequired,
    setPageIndex: PropTypes.func.isRequired,
    setPageSize: PropTypes.func.isRequired
};

export default Table;
