/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================
x
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';
import { Store } from 'StoreContext';

const Header = () => {
  const store = Store();

  const { user, stats } = store;

  return (
    <>
      <div
        className='header pb-8 pt-5 pt-md-8'
        style={{
          background:
            user?.role === 'brand'
              ? user?.preferences?.color
              : 'linear-gradient(87deg, #11cdef 0, #1171ef 100%)',
        }}
      >
        <Container fluid>
          <div className='header-body'>
            {/* Card stats */}
            <Row>
              <Col lg='6' xl='3'>
                <Card className='card-stats mb-4 mb-xl-0'>
                  <CardBody>
                    <Row>
                      {user?.role === 'brand' ? (
                        <div className='col'>
                          <CardTitle tag='h5' className='text-uppercase text-muted mb-0'>
                            Codes
                          </CardTitle>
                          <span className='h2 font-weight-bold mb-0'>
                            {stats?.allCodesCount ?? 0}
                          </span>
                        </div>
                      ) : (
                        <div className='col'>
                          <CardTitle tag='h5' className='text-uppercase text-muted mb-0'>
                            Codes
                          </CardTitle>
                          <span className='h2 font-weight-bold mb-0'>{stats?.codesCount ?? 0}</span>
                        </div>
                      )}
                      <Col className='col-auto'>
                        <div className='icon icon-shape bg-primary text-white rounded-circle shadow'>
                          <i className='fas fa-barcode' />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg='6' xl='3'>
                <Card className='card-stats mb-4 mb-xl-0'>
                  <CardBody>
                    <Row>
                      <div className='col'>
                        <CardTitle tag='h5' className='text-uppercase text-muted mb-0'>
                          Validated Codes
                        </CardTitle>
                        <span className='h2 font-weight-bold mb-0'>
                          {stats?.validatedCodesCount ?? 0}
                        </span>
                      </div>
                      <Col className='col-auto'>
                        <div className='icon icon-shape bg-success text-white rounded-circle shadow'>
                          <i class='fas fa-barcode' />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg='6' xl='3'>
                <Card className='card-stats mb-4 mb-xl-0'>
                  <CardBody>
                    <Row>
                      {user?.role === 'brand' ? (
                        <>
                          <div className='col'>
                            <CardTitle tag='h5' className='text-uppercase text-muted mb-0'>
                              Invalidated Codes
                            </CardTitle>
                            <span className='h2 font-weight-bold mb-0'>
                              {stats?.invalidatedCodesCount ?? 0}
                            </span>
                          </div>
                          <Col className='col-auto'>
                            <div className='icon icon-shape bg-danger text-white rounded-circle shadow'>
                              <i className='fas fa-users' />
                            </div>
                          </Col>
                        </>
                      ) : (
                        <>
                          <div className='col'>
                            <CardTitle tag='h5' className='text-uppercase text-muted mb-0'>
                              Brands
                            </CardTitle>
                            <span className='h2 font-weight-bold mb-0'>
                              {stats?.brandCount ?? 0}
                            </span>
                          </div>
                          <Col className='col-auto'>
                            <div className='icon icon-shape bg-yellow text-white rounded-circle shadow'>
                              <i className='fas fa-users' />
                            </div>
                          </Col>
                        </>
                      )}
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg='6' xl='3'>
                <Card className='card-stats mb-4 mb-xl-0'>
                  <CardBody>
                    <Row>
                      <div className='col'>
                        <CardTitle tag='h5' className='text-uppercase text-muted mb-0'>
                          Code Requests
                        </CardTitle>
                        <span className='h2 font-weight-bold mb-0'>{stats?.requestCount ?? 0}</span>
                      </div>
                      <Col className='col-auto'>
                        <div className='icon icon-shape bg-info text-white rounded-circle shadow'>
                          <i className='fas fa-plus' />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
