import Link from 'next/link'
import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import Default from '../../layouts/default'

function index() {
    return (
        <Default>
            <Container>
                <Row as="ul" className="list-unstyled mb-0">
                    <Col md="4" as="li">
                        <Link href="/members/member-list" >
                            <Card>
                                <Card.Body>
                                    <div className='text-center'>
                                        <div>
                                            <i className="icon material-symbols-outlined">group</i>
                                        </div>
                                        <div>
                                            All Members
                                        </div>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                    <Col md="4" as="li">
                        <Link href="member-list" >
                            <Card>
                                <Card.Body>
                                    <div className='text-center'>
                                        <div>
                                            <i className="icon material-symbols-outlined">group</i>
                                        </div>
                                        <div>
                                            New Members
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                    <Col md="4" as="li">
                        <Link href="member-list" >
                            <Card>
                                <Card.Body>
                                    <div className='text-center'>
                                        <div>
                                            <i className="icon material-symbols-outlined">group</i>
                                        </div>
                                        <div>
                                            Approved Members List
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </Default>
    )
}

export default index