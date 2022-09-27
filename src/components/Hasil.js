import React, { Component } from "react";
import { Badge, Col, ListGroup, Row, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/numbercommas";
import ModalKeranjang from "./ModalKeranjang";
import TotalBayar from "./TotalBayar";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }

  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan,
      totalHarga: menuKeranjang.total_harga
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah + 1)
    });
  };

  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah - 1)
      });
    }
  };

  changeHandler = (e) => {
    this.setState({
      keterangan: e.target.value
    })
  };

  handleSubmit = (e) => {
    //fungsi preventDefault adalah biar tidak ke-Reload
    e.preventDefault();

    this.handleClose();
    
    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan
    }

    axios
      .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
      .then(res => {
        this.props.getListKeranjang();
        swal({
          title: "Update Pesanan",
          text: "Pesanan Berhasil di Update! " + data.product.nama,
          icon: "success",
          button: false,
          timer: 1500,
        });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }

  hapusPesanan = (id) => {

    this.handleClose();
    
    axios
      .delete(API_URL + "keranjangs/" + id)
      .then(res => {
        this.props.getListKeranjang();
        swal({
          title: "Hapus Pesanan",
          text: "Pesanan Berhasil di Hapus! " + this.state.keranjangDetail.product.nama,
          icon: "error",
          button: false,
          timer: 1500,
        });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }

  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3} className='mt-3'>
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        {keranjangs.length !== 0 && (
          <Card className="overflow-auto hasil">
          <ListGroup variant="flush">
            {keranjangs.map((menuKeranjang) => (
              
              <ListGroup.Item
                key={menuKeranjang.id}
                onClick={() => this.handleShow(menuKeranjang)}
              >
                <Row>
                  <Col xs={2}>
                    <h4>
                      <Badge pill bg="success">
                        {menuKeranjang.jumlah}
                      </Badge>
                    </h4>
                  </Col>
                  <Col>
                    <h5>{menuKeranjang.product.nama}</h5>
                    <p>RP {numberWithCommas(menuKeranjang.product.harga)}</p>
                  </Col>
                  <Col>
                    <strong className="float-right">
                      RP {numberWithCommas(menuKeranjang.total_harga)}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              
            ))}

            <ModalKeranjang
              handleClose={this.handleClose}
              {...this.state}
              tambah={this.tambah}
              kurang={this.kurang}
              changeHandler={this.changeHandler}
              handleSubmit={this.handleSubmit}
              hapusPesanan={this.hapusPesanan}
            />
          </ListGroup>
          </Card>
        )}

        <TotalBayar keranjangs={keranjangs} {...this.props} />
      </Col>
    );
  }
}
