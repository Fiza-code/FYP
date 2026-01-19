import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Collapse,
  IconButton,
  Avatar,
  Chip,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openRows, setOpenRows] = useState({});

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders");
      const data = await res.json();

      const sorted = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setOrders(sorted);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleRow = (id) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const statusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "success";
      case "shipping":
        return "primary";
      case "pending":
      default:
        return "warning";
    }
  };

  if (loading)
    return (
      <Box textAlign="center" mt={6}>
        <CircularProgress />
      </Box>
    );

  if (orders.length === 0)
    return (
      <Box textAlign="center" mt={6}>
        <Typography variant="h6">No orders available</Typography>
      </Box>
    );

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3} fontWeight="bold">
        All Orders
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Customer</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((order) => (
              <React.Fragment key={order._id}>
                <TableRow>
                  <TableCell>
                    <IconButton size="small" onClick={() => toggleRow(order._id)}>
                      {openRows[order._id] ? (
                        <KeyboardArrowUp />
                      ) : (
                        <KeyboardArrowDown />
                      )}
                    </IconButton>
                  </TableCell>

                  <TableCell>{order.customer.name}</TableCell>
                  <TableCell>{order.customer.email}</TableCell>
                  <TableCell>{order.customer.phone}</TableCell>
                  <TableCell>{order.customer.address}</TableCell>
                  <TableCell>${order.totalAmount}</TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>

                  <TableCell>
                    <Chip
                      label={order.status}
                      color={statusColor(order.status)}
                      sx={{ fontWeight: "bold", textTransform: "capitalize" }}
                    />
                  </TableCell>

                  <TableCell>
                    {new Date(order.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>

                {/* COLLAPSE ROW */}
                <TableRow>
                  <TableCell colSpan={9} sx={{ p: 0 }}>
                    <Collapse in={openRows[order._id]} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 2 }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          gutterBottom
                        >
                          Ordered Products
                        </Typography>

                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Image</TableCell>
                              <TableCell>Name</TableCell>
                              <TableCell>Price</TableCell>
                              <TableCell>Quantity</TableCell>
                              <TableCell>Subtotal</TableCell>
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {order.items.map((item, idx) => (
                              <TableRow key={idx}>
                                <TableCell>
                                  <Avatar
                                    src={item.image}
                                    variant="rounded"
                                    sx={{ width: 50, height: 50 }}
                                  />
                                </TableCell>

                                <TableCell>{item.name}</TableCell>
                                <TableCell>${item.price}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>
                                  ${item.price * item.quantity}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Orders;
