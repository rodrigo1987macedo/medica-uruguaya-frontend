import React, { useState } from "react";
import Moment from "react-moment";
import styled from "styled-components";
import { status } from "../../constants/status";
import { table } from "../../constants/table";
import DeleteOne from "../popups/DeleteOne";
import Edit from "../popups/Edit";
import { CopyToClipboard } from "react-copy-to-clipboard";

const TableWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 85px;
  border-bottom: 1px solid ${props => props.theme.colors.border2};
  > div {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const TableHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 8px;
  height: 40px;
  border: 1px solid ${props => props.theme.colors.border1};
  background: ${props => props.theme.colors.background1};
`;

const TableContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 10px;
  height: 46px;
  border-bottom: 1px solid ${props => props.theme.colors.border1};
  color: ${props =>
    props.status === status.PENDING
      ? props.theme.colors.process
      : props.status === status.SUCCESS
      ? props.theme.colors.success
      : props.status === status.ERROR
      ? props.theme.colors.error
      : "inherit"};
  button {
    margin: 0 5px 0 0;
  }
`;

const CellContent = styled(CopyToClipboard)`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
`;

const Guard = styled.a`
  margin: 0 10px 0 0;
`;

const Actions = styled.div`
  text-align: center;
  width: 100%;
`;

function Table({ data, onUpdate }) {
  return (
    <TableWrapper>
      {data.map((column, i) => {
        return (
          <div key={column.heading + i}>
            <TableHeading>{column.heading}</TableHeading>
            {column.content &&
              column.content.map((item, j) => {
                return (
                  <TableContent
                    key={column.heading + j}
                    status={column.heading === table.STATE && item}
                  >
                    {column.heading === table.GUARD ? (
                      item.map(guard => {
                        return (
                          <CellContent
                            key={guard.url}
                            title={guard.createdAt}
                            text={item}
                          >
                            <Guard href={guard.url} download target="_blank">
                              <Moment format="DD/MM/YY">
                                {guard.createdAt}
                              </Moment>
                            </Guard>
                          </CellContent>
                        );
                      })
                    ) : column.heading === table.ACTIONS ? (
                      <Actions>
                        <Edit id={item} onUpdate={() => onUpdate()} />
                        <DeleteOne id={item} onUpdate={() => onUpdate()} />
                      </Actions>
                    ) : column.heading === table.FILES ? (
                      <CellContent title={item.name} text={item}>
                        <div>{item.name}</div>
                      </CellContent>
                    ) : column.heading === table.DATE_CRE ||
                      column.heading === table.DATE_MOD ? (
                      <CellContent title={item} text={item}>
                        <div>
                          Hace{" "}
                          <Moment fromNow ago locale="es">
                            {item}
                          </Moment>
                        </div>
                      </CellContent>
                    ) : (
                      <CellContent title={item} text={item}>
                        <div>{item}</div>
                      </CellContent>
                    )}
                  </TableContent>
                );
              })}
          </div>
        );
      })}
    </TableWrapper>
  );
}

export default Table;
