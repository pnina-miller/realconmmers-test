import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { Card, Container, Row, Col } from 'react-bootstrap'

export default function DetailesCard() {
  const history = useHistory()
  const item = history.location.state

  useEffect(() => {
    if (!item) { }
  }, [item])

  return (<>
    <Card style={{ marginTop: '50px' }}>
      <Container>
        <Row>
          <img
            onClick={() => history.push('/')}
            style={{width:'auto', height: '50px' }}
            src={`https://img.icons8.com/?id=80689&size=64&token=&format=png&fromSite=true&color=000000`}
            title='back'
            alt='back'
            />
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <h1>{item.Title}</h1>
            <h2>{item.Year.slice(0, 4)}</h2>
            <h2>type: {item.Type}</h2>
          </Col>
          <Col>
            {item.Poster?.includes('http') && <img alt='poster' src={item.Poster} />}
          </Col>
        </Row>
      </Container>
    </Card>
  </>)
}