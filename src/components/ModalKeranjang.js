import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { numberWithCommas } from "../utils/numbercommas";

const ModalKeranjang = ({
  showModal,
  handleClose,
  keranjangDetail,
  jumlah,
  keterangan,
  tambah,
  kurang,
  changeHandler,
  handleSubmit,
  totalHarga,
  hapusPesanan
}) => {
  if (keranjangDetail) {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {keranjangDetail.product.nama}{" "}
            <strong>
              {" "}
              (RP {numberWithCommas(keranjangDetail.product.harga)})
            </strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Total Harga :</Form.Label>
              <p>RP {numberWithCommas(totalHarga)}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Jumlah :</Form.Label>
              <br />
              <Button
                variant="primary"
                size="sm"
                className="mr-5"
                onClick={() => kurang()}
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              
              <strong>  {jumlah}  </strong>
              <Button
                variant="primary"
                size="sm"
                className="ml-5"
                onClick={() => tambah()}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Keterangan :</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="keterangan"
                value={keterangan}
                onChange={(e) => changeHandler(e)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Simpan
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => hapusPesanan(keranjangDetail.id)}>
            <FontAwesomeIcon icon={faTrash} /> Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Kosong</Modal.Title>
        </Modal.Header>
        <Modal.Body>Habis!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default ModalKeranjang;
