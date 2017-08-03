/* Distribution.jsx
 * Display the total tipout for each employee 
 */

import React from 'react';
import Card, { CardText, CardHeader, CardActions } from 'material-ui/Card';
import Table, { TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';

const Distribution = () => (
  <Card>
    <CardHeader
      title="Tip Distribution"
    />
    <CardText>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Hours Worked</TableHeaderColumn>
            <TableHeaderColumn>Tip Out</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
        </TableBody>
      </Table>
    </CardText>
    <CardActions>
      <FlatButton
        label="Close"
      />
    </CardActions>
  </Card>
);

export default Distribution;
