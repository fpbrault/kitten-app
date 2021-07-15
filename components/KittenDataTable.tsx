import React from 'react';
import MaterialTable from 'material-table';
import { TablePagination, TablePaginationProps } from '@material-ui/core';
import dateFormat from 'dateformat';
function PatchedPagination(props: TablePaginationProps) {
    const { ActionsComponent, onChangePage, onChangeRowsPerPage, ...tablePaginationProps } = props;

    return (
        <TablePagination
            {...tablePaginationProps}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            ActionsComponent={(subprops) => {
                const { onPageChange, ...actionsComponentProps } = subprops;
                return (
                    // @ts-expect-error ActionsComponent is provided by material-table
                    <ActionsComponent {...actionsComponentProps} onChangePage={onPageChange} />
                );
            }}
        />
    );
}

async function deleteKittenDataPost(id: number): Promise<void> {
    console.log(`/api/kittendatapost/${id}`);
    await fetch(`/api/kittendatapost/${id}`, {
        method: 'DELETE'
    });
}

type Props = {
    kittenData: {
        id: number;
        startWeight: number;
        finalWeight: number;
        time: Date;
        kittenId: number;
    }[];
    refreshData: () => void;
};

type RowData = {
    id: number;
    time: Date;
    startWeight: number;
    finalWeight: number;
};

const KittenDataTable: React.FC<Props> = (props) => {
    return (
        <div style={{ maxWidth: '100%' }}>
            <MaterialTable
                components={{
                    Pagination: PatchedPagination
                }}
                columns={[
                    {
                        title: 'Date',
                        field: 'time',
                        defaultSort: 'desc',
                        cellStyle: {
                            fontSize: '13px',
                            textAlign: 'center'
                        },
                        type: 'datetime',
                        render: function formatDate(row) {
                            return <span>{dateFormat(row['time'], 'dd mmm yy, h:MM TT')}</span>;
                        }
                    },
                    { title: 'id', field: 'id', hidden: true },
                    {
                        title: 'Start',
                        field: 'startWeight',
                        type: 'numeric',
                        cellStyle: {
                            fontSize: '12px',
                            textAlign: 'center'
                        }
                    },
                    {
                        title: 'End',
                        field: 'finalWeight',
                        type: 'numeric',
                        cellStyle: {
                            fontSize: '12px',
                            textAlign: 'center'
                        }
                    }
                ]}
                data={props.kittenData}
                title="Data entries"
                actions={[
                    {
                        icon: 'delete',
                        tooltip: 'Delete Entry',
                        onClick: (event, rowData: RowData) => {
                            if (confirm('Confirm delete?')) {
                                deleteKittenDataPost(rowData.id).then(() => {
                                    setTimeout(function () {
                                        props.refreshData();
                                    }, 800);
                                });
                            }
                        }
                    }
                ]}
                options={{
                    search: false,
                    actionsColumnIndex: -1,
                    headerStyle: {
                        backgroundColor: '#D8DBE2',
                        color: 'black',
                        padding: '0px',
                        fontSize: '12px',
                        textAlign: 'center'
                    },
                    rowStyle: {
                        padding: 0,
                        fontSize: '12px',
                        textAlign: 'center'
                    }
                }}
            />
        </div>
    );
};

export default KittenDataTable;
