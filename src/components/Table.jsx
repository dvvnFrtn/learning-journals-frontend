import PropTypes from "prop-types";

const Table = ({ columnDef, data }) => {
    return (
        <div className="my-4 border border-slate-300 rounded-xl overflow-clip">
            <table className="w-full items-center border-collapse">
                <thead>
                    <tr>
                        {columnDef.map(item => {
                            return (
                                <th key={item.id}
                                    className="px-6 align-middle border border-solid py-3 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-white text-slate-600 border-slate-300"
                                >
                                    {item.header}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map(row => {
                        return (
                            <tr key={row.id}>
                                {row.columns.map(col => {
                                    return (
                                        <td key={col.id}
                                            className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-slate-400 bg-white"
                                        >
                                            {col.value}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

Table.propTypes = {
    data: PropTypes.array.isRequired,
    columnDef: PropTypes.array.isRequired
}

export default Table;
