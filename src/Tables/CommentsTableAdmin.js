import React from 'react'
import { CCol, CDataTable, CImg } from '@coreui/react'
import { Route } from "react-router-dom";
import { FormatTimestamp } from 'src/reusable/reusables';
import Switch from "react-switch";
import { firebaseDB } from 'src/reusable/firebaseConfig';
import { CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';

const commentsFields = [
  { key: 'picture' },
  { key: 'author' },
  { key: 'content' },
  { key: 'createdAt' },
  { key: 'visibility' },
  {
    key: 'switchVisibility',
    label: '',
    _style: { width: '1%' },
    sorter: false,
    filter: false
  },
  { key: 'remove', label: '', _style: { width: '0%' }, sorter: false, filter: false },
]

export const CommentsTableAdmin = (props) => {

  return (
    <CCol xs="12">
      <Route render={({ history }) => (
        <CDataTable
          items={props.comments}
          fields={commentsFields}
          loading={props.loading}
          columnFilter
          cleaner
          itemsPerPage={20}
          tableFilter={{ 'placeholder': 'Search a comment...' }}
          pagination
          sorter
          sorterValue={{ column: "createdAt", asc: false }}
          clickableRows
          scopedSlots={{
            'picture':
              (item) => (
                <td>
                  <CImg src={(item.picture) ? item.picture : "avatar.png"}
                    width="36" height="36"
                    shape="rounded-circle" />
                </td>
              ),
            'content':
              (item) => (
                <td style={{ textAlign: 'justify' }}>
                  {item.content}
                </td>
              ),
            'createdAt':
              (item) => (
                <td>
                  <FormatTimestamp seconds={(item.createdAt != null ? item.createdAt.seconds : "N/A")} />
                </td>
              ),
            'switchVisibility':
              (item) => {
                return (
                  <td className="py-2" style={{ verticalAlign: 'inherit' }}>
                    <Switch checked={item.status} onChange={() => this.handleChangeVisibility(item, firebaseDB)} />
                  </td>
                )
              },
            'remove':
              (item, index) => {
                return (
                  <td className="py-2" style={{ verticalAlign: 'inherit' }}>
                    <CButton
                      size="sm"
                      style={{ color: "#e55353" }}
                      variant="outline"
                      onClick={() => {
                        this.removeProposal(item.proposalID)
                      }}

                    ><CIcon content={cilTrash} /></CButton>
                  </td>
                )
              },
          }
          }
        />
      )} />
    </CCol>
  )
}

