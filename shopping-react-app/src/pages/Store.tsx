import React from 'react'
import storeItems from "../data/item.json";
import { Col, Row } from 'react-bootstrap';
import StoreItem from '../components/StoreItem';

function Store() {
  return (
    <>
      <h1 className='mb-4'>Store</h1>
      <Row xs={1} md={2} lg={3} className='g-3'>
        {storeItems.map(item => (
          <Col key={item.id}><StoreItem {...item} /></Col>
        ))}
      </Row>
    </>
  )
}

export default Store