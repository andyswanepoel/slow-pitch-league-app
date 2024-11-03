import * as React from "react";
import { useLoaderData } from "@tanstack/react-router";
import { ScheduleTable } from "./ScheduleTable";
import { Box, Heading, Select, Text } from "@chakra-ui/react";

export const SeasonSchedule: React.FC = () => {
  const { schedule, teams } = useLoaderData({
    from: "/__authenticated/schedule/$seasonId"
  });

  const [selectedTeamId, setSelectedTeamId] = React.useState("");

  const filteredSchedule = selectedTeamId
    ? schedule.filter(
        game =>
          game.away_team_id === selectedTeamId ||
          game.home_team_id === selectedTeamId
      )
    : schedule;

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeamId(e.target.value);
  };

  return (
    <Box>
      <Heading as="h1">Schedule</Heading>
      <Box my="2">
        <Text>Select a team below to filter games.</Text>
        <Select onChange={handleOnChange} borderColor="gray.400">
          <option value="">Show all teams</option>
          {teams.map(team => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </Select>
      </Box>
      <ScheduleTable schedule={filteredSchedule} teams={teams} />
    </Box>
  );
};
