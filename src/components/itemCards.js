import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap'

export function GridItemCard({ item, setTitle }) {
    const history = useHistory()
    return (
        <Col xs={12} md={6} lg={3}>
            <Card className='card-grid-card' >
                <EditAbleTitle itemId={item.imdbID} title={item.Title} setTitle={setTitle}/>
                 <Card.Img 
                 className='card-grid-img'
                 onClick={() => history.push(`/${item.Title}`, item)}
                 onLoad={e=>e.target.style.display=''} 
                 key={item.Poster} 
                 onError={e=>{e.target.style.display='none'}} 
                 src={item.Poster}   
                 />
            </Card>
        </Col>
    )
}

export function ListItemCard({ item, setTitle }) {
    const history = useHistory()

    return (
        <Card className='card-list-card'>
            <Row>
                <Col xs={12} md={2}>
                    <Card.Img 
                    onLoad={e=>e.target.style.display=''} 
                    onError={e=>{e.target.style.display='none'}} 
                    onClick={() => history.push(`/${item.Title}`, item)}
                    src={item.Poster} 
                    className='card-list-img' 
                     />
                </Col>
                <Col xs={12} md={10} className='card-list-details-col' >
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
            : <Card.Title onClick={() => setTitleInput(true)} className='editAble-title' >{title}</Card.Title>
    )
}
