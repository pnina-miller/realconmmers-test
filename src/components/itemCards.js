import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap'

export function GridItemCard({ item, setTitle }) {
    const history = useHistory()
    return (
        <Col xs={12} md={6} lg={3}>
            <Card style={{ marginTop: '20px', minHeight: '100%' }}>
                <EditAbleTitle itemId={item.imdbID} title={item.Title} setTitle={setTitle} />
                {item.Poster?.includes('http') && <Card.Img src={item.Poster} onClick={() => history.push(`/${item.Title}`, item)} />}
            </Card>
        </Col>
    )
}

export function ListItemCard({ item, setTitle }) {
    const history = useHistory()

    return (
        <Card style={{ marginTop: '20px' }}>
            <Row>
                <Col xs={12} sm={2}>
                    {item.Poster?.includes('http') && <Card.Img src={item.Poster} style={{ height: '150px', width: 'fit-content' }} onClick={() => history.push(`/${item.Title}`, item)} />}
                </Col>
                <Col xs={12} sm={10} style={{ 'text-align': 'initial', paddingTop: '15px' }}>
                    <EditAbleTitle itemId={item.imdbID} title={item.Title} setTitle={setTitle} />
                    <h6>{item.Year.slice(0, 4)}</h6>
                    <h6>type: {item.Type}</h6>
                </Col>
            </Row>
        </Card>
    )

}

function EditAbleTitle({ title, setTitle, itemId }) {
    const [titleInput, setTitleInput] = useState(false)

    return (
        titleInput ?
            <input defaultValue={title} onBlur={e => { setTitleInput(false); setTitle(title, e.target.value, itemId) }} />
            : <Card.Title onClick={() => setTitleInput(true)}>{title}</Card.Title>
    )
}
