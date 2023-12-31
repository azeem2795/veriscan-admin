/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from 'api';
import { Store, UpdateStore } from 'StoreContext';
import {
  Card,
  CardHeader,
  Button,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  Row,
} from 'reactstrap';
import { frontendUrl } from '../../config';

// core components
import AddUser from './AddBrand';
import EditBrand from './EditBrand';
import { toast } from 'react-toastify';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import { mediaUrl } from '../../config';
import Spinner from 'components/Spinner/Spinner';
import moment from 'moment';

const Brands = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { brands } = Store();
  const updateStore = UpdateStore();
  const history = useHistory();
  const [user, setUser] = useState({
    _id: '',
    name: '',
    email: '',
    url: '',
    logo: '',
    websiteLink: '',
    logoWidth: '',
    preferences: {
      color: '#000000',
      secondaryColor: 'black',
    },
  });
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      setLoading(true);
      const data = await api('get', '/users?role=brand');

      updateStore({ brands: data.users });
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleModal = () => {
    setOpenModal((open) => !open);
    return openModal;
  };

  const handleEditModal = (item) => {
    if (item) {
      setUser({
        _id: item._id,
        name: item.name,
        email: item.email,
        url: item.url,
        websiteLink: item.websiteLink ? item.websiteLink : '',
        logo: item.preferences?.logo,
        logoWidth: item.logoWidth ? item.logoWidth : '',
        preferences: {
          color: item?.preferences?.color,
          secondaryColor: item?.preferences?.secondaryColor,
          logo: item.preferences?.logo,
        },
      });
      setFileName(item?.preferences?.logo ? `${mediaUrl}${item?.preferences?.logo}` : '');
    }

    setEditModal((open) => !open);
    return openModal;
  };

  const handleConfirmModal = () => {
    setConfirmModal((prev) => !prev);
  };

  const handleActive = (id) => {
    setLoading(true);
    api('patch', `/users/change-status/${id}`)
      .then((res) => {
        toast.success(res?.message);
        getUsers();
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleDeleteBrand = (item) => {
    setUser({
      _id: item._id,
      name: item.name,
    });
    handleConfirmModal();
  };

  const handleDelete = () => {
    if (user?._id) {
      setLoading(true);
      api('delete', `/users/admin/${user._id}`)
        .then(() => {
          toast.success('Brand deleted successfully');
          handleConfirmModal();
          getUsers();
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      toast.error('Please select brand');
    }
  };

  return (
    <>
      <Container className='mt--7' fluid>
        {loading && <Spinner />}
        {/* Table */}
        <Row>
          <div className='col'>
            <Card className='shadow'>
              <CardHeader className='border-0'>
                <div className='d-flex justify-content-between '>
                  <h3 className='mb-0'>Brands</h3>
                  <Button color='primary' onClick={handleModal} size='md'>
                    <i className='ni ni-fat-add'></i>
                    Add brand
                  </Button>
                </div>
              </CardHeader>
              <Table className='align-items-center table-flush' responsive>
                <thead className='thead-light'>
                  <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>URL</th>
                    <th scope='col'>Active</th>
                    <th scope='col'>Created At</th>
                    <th scope='col' />
                  </tr>
                </thead>
                <tbody>
                  {brands?.map((item) => {
                    return (
                      <tr>
                        <th scope='row'>
                          <Media className='align-items-center'>
                            <Media>
                              <span className='mb-0 text-sm' title={item.name}>
                                {item.name?.length > 30
                                  ? item.name?.substring(0, 30) + '...'
                                  : item.name}
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td title={item.email}>
                          {item.email?.length > 30
                            ? item.email?.substring(0, 30) + '...'
                            : item.email}
                        </td>
                        <td title={item.name}>
                          <a
                            href={`${frontendUrl}${(item.url)}`}
                            target='_blank'
                            style={{
                              textDecoration: 'none',
                              color: 'inherit',
                              fontWeight: 'bold',
                            }}
                            rel='noreferrer'
                          >{`${(item.url)}`}</a>
                        </td>

                        <td>{item.active ? 'Active' : 'Deactivated'}</td>
                        <td>{moment(item.createdAt).format('MMMM DD, yyyy hh:mm A')}</td>
                        <td className='text-right'>
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className='btn-icon-only text-light'
                              role='button'
                              size='sm'
                              color=''
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className='fas fa-ellipsis-v' />
                            </DropdownToggle>
                            <DropdownMenu className='dropdown-menu-arrow' right>
                              {/* <a
                                href={`${frontendUrl}/${encodeURI(item.name)}`}
                                target='_blank'
                                style={{
                                  textDecoration: 'none',
                                  color: 'inherit',
                                  fontWeight: 'bold',
                                }}
                                rel='noreferrer'
                              >
                                <DropdownItem>View as client</DropdownItem>
                              </a> */}
                              <DropdownItem onClick={() => handleEditModal(item)}>
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                className={item.active ? 'text-danger' : 'text-success'}
                                onClick={() => handleActive(item?._id)}
                              >
                                {item.active ? 'De-activate' : 'Activate'}
                              </DropdownItem>
                              <DropdownItem
                                className='text-danger'
                                onClick={() => handleDeleteBrand(item)}
                              >
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>

        <ConfirmModal
          handleModal={handleConfirmModal}
          openModal={confirmModal}
          description={`You are about delete ${user?.name}, all data linked with this brand will be deleted
            permanently.`}
          heading='Delete brand'
          handleSubmit={handleDelete}
          loading={loading}
        />

        {openModal && (
          <AddUser
            loading={loading}
            setLoading={setLoading}
            openModal={openModal}
            handleModal={handleModal}
            getUsers={getUsers}
          />
        )}
        {editModal && (
          <EditBrand
            openModal={editModal}
            handleModal={handleEditModal}
            user={user}
            fileName={fileName}
            setFileName={setFileName}
            setUser={setUser}
            getUsers={getUsers}
            setLoading={setLoading}
          />
        )}
      </Container>
    </>
  );
};

export default Brands;
