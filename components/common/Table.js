import React from "react";
import Moment from "react-moment";
import styled from "styled-components";
import { status } from "../../constants/status";
import { table } from "../../constants/table";

const TableWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 80px;
  border-bottom: 1px solid ${props => props.theme.colors.border2};
  div {
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
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
`;

const Guard = styled.a`
  margin: 0 10px 0 0;
`;

function Table({ data }) {
  return (
    <TableWrapper>
      {data.map(column => {
        return (
          <div key={column.heading}>
            <TableHeading>{column.heading}</TableHeading>
            {column.content &&
              column.content.map((item, index) => {
                return (
                  <TableContent
                    key={item.toString() + index}
                    status={column.heading === table.STATE && item}
                  >
                    {column.heading === table.GUARD ? (
                      item.map(guard => {
                        return (
                          <div>
                            <Guard href={guard.url} download target="_blank">
                              <Moment format="DD/MM/YY">
                                {guard.createdAt}
                              </Moment>
                            </Guard>
                          </div>
                        );
                      })
                    ) : column.heading === table.FILES ? (
                      item.name
                    ) : column.heading === table.DATE_CRE ||
                      column.heading === table.DATE_MOD ? (
                      <div>
                        Hace{" "}
                        <Moment fromNow ago locale="es">
                          {item}
                        </Moment>
                      </div>
                    ) : (
                      <div>{item}</div>
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
