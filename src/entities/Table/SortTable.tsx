/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
    createColumnHelper,
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table';
import { BiSortAlt2, BiSortDown, BiSortUp } from 'react-icons/bi';
import IndeterminateCheckbox from '../../shared/components/Checkbox/Checkbox';
import Output from '@/features/OutputPickedTable/Output';
import IUser from '@/interfaces';

const GlobalFilterInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-width: 400px;
  margin-bottom: 16px;
`;

const H1 = styled.h1`
  font-size: 2.5rem;
`;
const Button = styled.button`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  overflow-y: scroll;
  height: 350px;
  border: 3px solid #ccc;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledTh = styled.th`
  white-space: nowrap;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const StyledTd = styled.td`
  white-space: nowrap;
  padding: 0.5rem;
`;

const StyledTr = styled.tr`
  &:nth-child(2n) {
    background: rgba(0, 0, 0, 0.05);
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
`;

const TableHeaderDiv = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderSortIcon = styled.span`
  display: inline-block;
`;

const columnHelper = createColumnHelper<IUser>();

const columns = [
    columnHelper.display({
        id: 'selection',
        header: ({ table }) => (
            <IndeterminateCheckbox
                checked={table.getIsAllRowsSelected()}
                indeterminate={table.getIsSomeRowsSelected()}
                onChange={table.getToggleAllRowsSelectedHandler()}
            />
        ),
        cell: ({ row }) => (
            <IndeterminateCheckbox
                checked={row.getIsSelected()}
                indeterminate={row.getIsSomeSelected()}
                onChange={row.getToggleSelectedHandler()}
            />
        ),
    }),
    columnHelper.accessor('id', {
        header: 'ID',
        cell: (info) => info.getValue(),
        enableGlobalFilter: false,
        enableSorting: true,
    }),
    columnHelper.accessor('firstName', {
        header: 'First Name',
        cell: (info) => info.getValue(),
        enableGlobalFilter: true,
        enableSorting: true,
    }),
    columnHelper.accessor('lastName', {
        header: 'Last Name',
        cell: (info) => info.getValue(),
        enableGlobalFilter: true,
        enableSorting: true,
    }),
    columnHelper.accessor('email', {
        header: 'Email',
        cell: (info) => info.getValue(),
        enableGlobalFilter: true,
        enableSorting: true,
    }),
    columnHelper.accessor('phone', {
        header: 'Phone',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor(
        (row) => `${row.address.city}, ${row.address.streetAddress}`,
        {
            id: 'address',
            header: 'Address',
            cell: (info) => info.getValue(),
        }
    ),
];
export default function Sortable() {

    const [globalFilter, setGlobalFilter] = useState('');
    const [rowSelection, setRowSelection] = useState({});
    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (error: unknown) {
                setError('Ошибка получения данных');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
            rowSelection,
        },
        onGlobalFilterChange: setGlobalFilter,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        globalFilterFn: 'includesString',
    });

    return (
        <>
            <H1>User Table😀</H1>
            <div>
                <GlobalFilterInput
                    value={inputValue ?? ''}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Search all columns..."
                />
                <Button onClick={() => setGlobalFilter(inputValue)}>Найти</Button>
            </div>
            <TableWrapper>
                {loading ? <div>Loading...</div> :
                    <>
                        {!error &&
                            <StyledTable>
                                <thead>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <StyledTr key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => (
                                                <StyledTh key={header.id}>
                                                    <TableHeaderDiv
                                                        onClick={header.column.getToggleSortingHandler()} // исправление
                                                    >
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                        {header.column.getCanSort() && (
                                                            <HeaderSortIcon>
                                                                {header.column.getIsSorted() === 'asc' ? (
                                                                    <BiSortUp />
                                                                ) : header.column.getIsSorted() === 'desc' ? (
                                                                    <BiSortDown />
                                                                ) : (
                                                                    <BiSortAlt2 />
                                                                )}
                                                            </HeaderSortIcon>
                                                        )}
                                                    </TableHeaderDiv>
                                                </StyledTh>
                                            ))}
                                        </StyledTr>
                                    ))}
                                </thead>
                                <tbody>
                                    {table.getRowModel().rows.map((row) => (
                                        <StyledTr key={row.id}>
                                            {row.getVisibleCells().map((cell) => (
                                                <StyledTd key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </StyledTd>
                                            ))}
                                        </StyledTr>
                                    ))}
                                </tbody>
                            </StyledTable>
                        }
                    </>}
            </TableWrapper>
            <div>
                <pre>
                    {Object.keys(rowSelection).length > 0 && (
                        <Output
                            data={table.getSelectedRowModel().rows.map((row) => row.original)}
                        />
                    )}
                </pre>
            </div>
        </>
    );
}
