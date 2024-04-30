import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { adminPostedCodes, deleteRedeemCode, getCodes } from "../../APIs/redeemAPI";
import { Button } from '@mui/material';
import '@mui/material/styles';


const UserList = () => {
  const email = localStorage.getItem("Email");
  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);
  const [update, setUpdate] = useState(0);

  const fetchData = async () => {
    const codes = await getCodes();
    // Generate unique IDs for each row
    // if (!codes) return;

    const rowsWithIds = codes.data.data.map((row, index) => ({ ...row, id: row._id }));
    setData(rowsWithIds);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', Username: 'JohnShow124', Password: 'john1124', email: "knownothingjohn@gmail.com", PlanType: "Premium", RegistrationDate: "12 Jul 2019" },
  ];


  const handleButtonClick = async (rowData) => {
    await deleteRedeemCode(rowData._id, fetchData);
  };

  const columns = [
    { field: "code", headerName: "Prepay Code", width: 200 },
    { field: "duration", headerName: "Plan Length", width: 200 },
    { field: "assignee", headerName: "Assigned To", width: 200 },
    {
      field: "activated",
      headerName: "Status",
      width: 130,
      renderCell: (params) => {
        let inUse = params.row.activated;

        let statusText = inUse ? 'used' : 'pending';

        return <div>{statusText.toString()}</div>;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <Button
          variant="contained"
          color="primary"
          disabled={params.row.activated === true}
            onClick={() => handleButtonClick(params.row)}
          >
            Delete
          </Button>
        );
      },
    },
  ];



  const customTheme = {
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            '& .MuiDataGrid-pagination': {
              '& .MuiTablePagination-root': {
                '& .MuiTablePagination-actions': {
                  '& .MuiIconButton-root': {
                    color: 'white',
                  },
                },
                '& .MuiTablePagination-input': {
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                  '& .MuiIconButton-root': {
                    color: 'white',
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return (
    <Wrapper>
      <p className="TitleText">List of Prepay Codes</p>
      <div className="CardsDisplay">
        {err ? (
          <p>No prepay codes available.</p>
        ) : (
          <div className="table">
            <DataGrid
              rows={data}
              columns={columns.map((column) => ({
                ...column,
              }))}
              pageSize={10}
              checkboxSelection
              components={customTheme}
              getRowId={(row) => row.id} // Specify the custom id property
            />
          </div>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
margin-top:4.5%;
width: 70%;
.TitleText{
    color: #1c1f25;
    padding:15px;
    font-weight:100;
    padding-left:105px;
    font-size:35px;
}
.table{
    width: 80%;
    height: 600px;
}
.CardsDisplay{
    padding-left:105px;
    width:90%;
    margin-top:4%;
}
@media (max-width: 767px) {
   width: 100%;

    .TitleText{
        font-size:50px;

        padding:0px;
        padding-left:0px;
        text-align:center;
    }
    .CardsDisplay{
        padding-left:0px;
        width:100%;
    }
    .table{
        height: 600px;
         width:100%;
    }
}
`
export default UserList;