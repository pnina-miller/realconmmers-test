
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'

import { GridItemCard, ListItemCard } from './itemCards'


export default function DataView({ data, getServerData }) {

  const [typesArr, setTypesArr] = useState([])
  const [cardsView, setCardsView] = useState([])
  const [gridView, setGridView] = useState(true)
  const [sortIcon, setSortIcon] = useState('a0bAWjN2IPpJ')
  const [searchWord, setSearchWord] = useState('')

  const setTitle = (oldTitle, newTitle, itemId) => {
    if (oldTitle !== newTitle) {
      setCardsView(oldCardsView => oldCardsView.map(item => (item.Title === oldTitle ? { ...item, Title: newTitle } : item)))
      axios({
        method: "post",
        url: "react_Response.json/" + itemId,
        data: {
          oldTitle: oldTitle,
          newTitle: newTitle,
        },
      })
        .catch(error => alert('failed to save data error description: ' + error))
    }
  }

  useEffect(() => {
    setCardsView(data?.results)
    let a = [...new Set(data?.results.map(item => item.Type))]
    setTypesArr(a.map(b => ({ type: b, count: data.results.filter(c => c.Type === b).length })))
  }, [data])
  useEffect(() => filterCards(searchWord), [searchWord])

  const filterCards = (value) => {
    setCardsView(data?.results?.filter(item => item.Title.toLowerCase().includes(value.toLowerCase()) || item.Year.slice(0, 4).includes(value)))

  }
  return (
    <Container className='data-view-container' >
      <h1>Pnina Miller</h1>
      <Row className='data-view-row'>
        <img
          className='refresh-icon view-data-icon'
          src='https://img.icons8.com/?id=59872&size=30&token=&format=svg&fromSite=true&color=000000'
          onClick={getServerData}
          title='refresh'
          alt='refresh'
        />
        <img
          onClick={() => {
            setSortIcon(oldSor => oldSor === 'a0bAWjN2IPpJ' ? 'iG5-XShb_qrY' : 'a0bAWjN2IPpJ');
            setCardsView(cardsView.slice().reverse())
          }}
          className='view-data-icon'
          src={`https://img.icons8.com/?id=${sortIcon}&size=32&token=&format=png&fromSite=true&color=000000`}
          title='sort'
          alt='sort'
        />

        <input
          className='data-view-search-input'
          value={searchWord}
          onChange={e => setSearchWord(e.target.value)}
        />
        <img
          className='view-data-icon clear-filter-icon'
          src={`https://img.icons8.com/?id=5310&size=24&token=&format=png&fromSite=true&color=000000`}
          onClick={() => setSearchWord('')}
          title='clear filtering'
          alt='clear filtering'
        />
      </Row>
      <Row>
        <Col xs={12} md={11}>
          <Tabs defaultActiveKey='all' id='types-tabs' onSelect={type => {setSearchWord(''); setCardsView(data?.results?.filter(item => item.Type.includes(type))) }}>
            <Tab
              eventKey={''}
              title={`all (${data?.results?.length})`}
            />
            {typesArr?.map((type, i) => (
              <Tab
                tabClassName='types-tab'
                eventKey={type.type}
                title={`${type.type} (${type.count})`}
              >
              </Tab>
            ))}
          </Tabs>
        </Col>
        <Col xs={1}>
          <span title='grid' className='svg-icon' onClick={() => setGridView(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#707070" class="bi bi-grid-fill" viewBox="0 0 16 16">
              <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z" />
            </svg>
          </span>
          <span title='list' className='svg-icon' onClick={() => setGridView(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#707070" class="bi bi-list-ul" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            </svg></span>
        </Col>
      </Row>
      <Row>
        {cardsView?.map(item => gridView ? <GridItemCard item={item} setTitle={setTitle} /> : <ListItemCard item={item} setTitle={setTitle} />)}
      </Row>
    </Container>
  )
}


