'use client';

import React from 'react';
import TableWrapper from '@/components/common/TableWrapper';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Balances } from '@prisma/client';
import EditBalances from './EditBalances';
import { Badge } from '@/components/ui/badge';

type BalanceRowType = {
	title: string;
	values: string[];
};

const BalanceRow = ({ title, values }: BalanceRowType) => (
	<TableHead className='text-center font-extrabold text-gray-400 border-none'>
		{title}
		<TableRow>
			{values.map((value, index) => (
				<TableHead key={index} className='border-none'>
					{value}
				</TableHead>
			))}
		</TableRow>
	</TableHead>
);

type BalanceProps = {
	balances: Balances[];
};

const BalancesTable = ({ balances }: BalanceProps) => {
	const balanceCategories = [
		{ title: 'ANNUAL', values: ['Credit', 'Used', 'Available'] },
		{ title: 'CASUAL', values: ['Credit', 'Used', 'Available'] },
		{ title: 'SICK', values: ['Credit', 'Used', 'Available'] },
		{ title: 'MATERNITY', values: ['Credit', 'Used', 'Available'] },
		{ title: 'PATERNITY', values: ['Credit', 'Used', 'Available'] },
		{ title: 'STUDY', values: ['Credit', 'Used', 'Available'] },
		{ title: 'UNPAID', values: ['Used'] },
	];

	const renderTableCells = (bal: CellTypes) => {
		const categories = [
			'annual',
			'casual',
			'sick',
			'maternity',
			'paternity',
			'study',
			'unpaid',
		];

		return categories.map((category) => (
			<TableCell key={category} className='font-bold'>
				<TableRow>
					{['Credit', 'Used', 'Available'].map((type, index) => (
						<TableCell key={index} className={`w-[100px]`}>
							{bal[`${category}${type}`]}
						</TableCell>
					))}
				</TableRow>
			</TableCell>
		));
	};

  return (
    <TableWrapper title="All User Leave Remaining">
      <Table className="font-bold">
        <TableHeader>
          <TableRow className="font-extrabold ">
            <TableHead className="text-center">Edit</TableHead>
            <TableHead className="text-center">User</TableHead>
            <TableHead className="text-center">Year</TableHead>
            {balanceCategories.map((category, index) => (
              <BalanceRow
                key={index}
                title={category.title}
                values={category.values}
              />
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="whitespace-nowrap text-center">
          {balances?.map((bal) => (
            <TableRow key={bal.id}>
              <TableCell>
                <EditBalances balance={bal}/>
              </TableCell>
              <TableCell>{bal.name}</TableCell>
              <TableCell><Badge>{bal.year} </Badge> </TableCell>
              {renderTableCells(bal)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
};

export default BalancesTable;
