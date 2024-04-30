import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { fetchusers,updateusers } from "../../APIs/authAPI";
import { Button } from '@mui/material';
import '@mui/material/styles';




const Users = () => {
  const email = localStorage.getItem("Email");
  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchusers();
        console.log(data)
        if (data.data.message == 'No entries found') {
          setErr(true);
        }
        else {
          setErr(false);
          setData(data.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [update]);

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', Username: 'JohnShow124', Password: 'john1124', email: "knownothingjohn@gmail.com", PlanType: "Premium", RegistrationDate: "12 Jul 2019" },
  ];


  const handleButtonClick = async (rowData,func) => {
    console.log("Row Data:", rowData);
    const body = await updateusers(rowData, func);
    console.log(body);
    setUpdate(prevValue => prevValue + 1);
  };

  const columns = [
    // { field: "id", headerName: "ID", width: 250 },
    { field: "name", headerName: "User Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "verified", headerName: "Status", width: 200 },
    {
        field: "actions",
        headerName: "Actions",
        width: 300,
        renderCell: (params) => {
          const customButtonStyle = {
            padding: '8px 19px',
            fontSize: '12px',
            marginRight: '8px', // Add margin to create a gap between buttons
          };
          const customButtonStyle2 = {
            padding: '8px 12px',
            fontSize: '12px',
            marginRight: '8px', // Add margin to create a gap between buttons
          };
          return (
            <div>
              {params.row.verified ? (
                <Button
                  variant="contained"
                  color="primary"
                  style={customButtonStyle2}
                  onClick={() => handleButtonClick(params.id,'deactivate')}
                >
                  Deactivate
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  style={customButtonStyle}
                  onClick={() => handleButtonClick(params.id,'activate')}
                >
                  Activate
                </Button>
              )}
              <Button
                variant="contained"
                color="secondary"
                style={customButtonStyle}
                onClick={() => handleButtonClick(params.id,'deleteuser')}
              >
                Delete
              </Button>
            </div>
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
      <p className="TitleText">List of users</p>
      <div className="CardsDisplay">
        {err ? (
          <p>No users available.</p>
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
    width: 100%;
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
export default Users;