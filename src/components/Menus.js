import React from "react";
import { Col, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/numbercommas";

export const Menus = ({ menu, masukKeranjang }) => {
  return (
    <Col className="mb-4" md={4} xs={6}>
      <Card className="shadow" onClick={() => masukKeranjang(menu)}>
        <Card.Img
          variant="top"
          src={
            "assets/images/" +
            menu.category.nama.toLowerCase() +
            "/" +
            menu.gambar
          }
        />
        <Card.Body>
          <Card.Title>{menu.nama} <strong>({menu.kode})</strong></Card.Title>
          <Card.Text>RP {numberWithCommas(menu.harga)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};
