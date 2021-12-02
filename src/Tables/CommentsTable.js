import React from 'react'
import { CCol, CDataTable, CImg } from '@coreui/react'
import { Route } from "react-router-dom";
import { FormatTimestamp } from 'src/reusable/reusables';
import { getCookie } from 'src/reusable/reusables';

const commentsFields = [
  { key: 'card', label: "", sorter: false, filter: false },
  { key: 'author' },
  { key: 'content' },
  { key: 'createdAt' },
]

export const CommentsTable = (props) => {
  return (
    <CCol xs="12">
      <Route render={({ history }) => (
        <CDataTable
          items={props.comments}
          fields={commentsFields}
          loading={props.loading}
          header={false}
          itemsPerPage={20}
          pagination
          sorter
          sorterValue={{ column: "createdAt", asc: false }}
          clickableRows
          scopedSlots={{
            'card':
              (item) => (
                <td>
                  <div style={{ backgroundColor: "#f0f3f5", borderRadius: "5px", padding: '10px 10px 40px' }}>
                    <div style={{ width: '100%' }}>
                      <div style={{ width: "20%", float: 'left', textAlign: "center", marginLeft: '-6px', marginRight: '6px' }}>
                        <CImg src={(item.picture) ? item.picture : "avatar.png"}
                          width="36" height="36"
                          shape="rounded-circle"
                          onClick={() => {
                            if (getCookie("userEmail") === item.email) {

                              history.push("/profile")

                            } else {
                              history.push({
                                pathname: "/users-profile",
                                state: item
                              })
                            }
                          }
                          }
                        />
                      </div>

                      <div style={{ width: "80%", float: 'left' }}>
                        <strong style={{ fontSize: 'small' }}> {item.author}</strong>
                      </div>
                    </div>

                    <div style={{ width: "80%" }}>
                      <p style={{ color: "#00000066", fontSize: 'smaller', marginBottom: '4px' }}>{<FormatTimestamp seconds={item.createdAt.seconds} />}</p>
                    </div>

                    <div style={{ width: "100%" }}>
                      <hr></hr>
                    </div>

                    <div style={{ width: "100%", fontSize: 'small' }}>
                      <p>{item.content}</p>
                    </div>
                  </div>

                </td>
              ),
            'author':
              (item) => (
                <td
                  style={{ display: "none" }}>
                </td>
              ),
            'content':
              (item) => (
                <td
                  style={{ display: "none" }}>
                </td>
              ),
            'createdAt':
              (item) => (
                <td
                  style={{ display: "none" }}>
                </td>
              ),
          }
          }
        />
      )} />
    </CCol>
  )
}

