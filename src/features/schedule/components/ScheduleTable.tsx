import * as React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer
} from "@chakra-ui/react";
import {} from "@chakra-ui/react";

import type { IGame } from "../types";
import type { ITeam } from "../api";
import { convertToEasternTime } from "../create-schedule/convertToEST";

interface IScheduleTable {
  schedule: IGame[];
  teams: ITeam[];
}

export const ScheduleTable: React.FC<IScheduleTable> = ({
  schedule,
  teams
}) => {
  const teamIdNameDictionary = React.useMemo(() => {
    return teams.reduce(
      (acc, curr) => {
        acc[curr.id] = curr.name;
        return acc;
      },
      {} as Record<string, string>
    );
  }, [teams]);
  return (
    <TableContainer>
      <Table size="md">
        <Thead bg="gray.100">
          <Tr>
            <Th color="gray.700">Date</Th>
            <Th color="gray.700">Home Team</Th>
            <Th color="gray.700">Away Team</Th>
            <Th color="gray.700">Location</Th>
          </Tr>
        </Thead>
        <Tbody>
          {schedule.map((game, i) => (
            <Tr
              bg={i % 2 !== 0 ? "gray.100" : "gray.50"}
              key={JSON.stringify(game)}
            >
              <Td>{convertToEasternTime(game.game_time)}</Td>
              <Td>{teamIdNameDictionary[game.home_team_id]}</Td>
              <Td>{teamIdNameDictionary[game.away_team_id]}</Td>
              <Td>{game.location}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
