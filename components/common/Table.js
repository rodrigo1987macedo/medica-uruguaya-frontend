import React from "react";
import Moment from "react-moment";
import styled from "styled-components";
import { status } from "../../constants/status";
import { table } from "../../constants/table";

const TableWrapper = styled.div`
  display: flex;
  width: 100%;
  > div:nth-child(1) {
    flex: 0 0 200px;
  }
  > div:nth-child(n + 2) {
    flex: 1;
  }
`;
const TableHeading = styled.div`
  display: flex;
  border: 1px solid ${props => props.theme.colors.border1};
  padding: 8px;
  background: ${props => props.theme.colors.background1};
`;

const TableContent = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.border1};
  padding: 14px 8px;
  color: ${props =>
    props.status === status.PENDING
      ? props.theme.colors.process
      : props.status === status.SUCCESS
      ? props.theme.colors.success
      : props.status === status.ERROR
      ? props.theme.colors.error
      : "inherit"};
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
                    {column.heading === table.FILES ? (
                      item.name
                    ) : column.heading === table.DATE_CRE ||
                      column.heading === table.DATE_MOD ? (
                      <>
                        Hace{' '}
                        <Moment fromNow ago locale="es">
                          {item}
                        </Moment>
                      </>
                    ) : (
                      item
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
