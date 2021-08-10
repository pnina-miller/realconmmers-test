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
    <Card className='detailes-card-card' >
      <Container>
        <Row>
          <img
            onClick={() => history.push('/')}
            className='detailes-card-img'
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
             <img 
             alt='poster' 
             src={item.Poster}
             onLoad={e=>e.target.style.display=''} 
             key={item.Poster} 
             onError={e=>e.target.style.display='none'} 
              />
          </Col>
        </Row>
      </Container>
    </Card>
  </>)
}