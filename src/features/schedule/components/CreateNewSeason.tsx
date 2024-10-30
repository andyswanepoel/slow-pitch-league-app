import * as React from "react";
import { useLoaderData, useRouter } from "@tanstack/react-router";
import {
  addGamesToSeason,
  getSeasonByDates,
  createSeason,
  type ITeam
} from "../api";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Heading,
  Stack,
  Text
} from "@chakra-ui/react";
import { generateSchedule, sleep } from "../create-schedule/generateSchedule";
import { getDayName } from "../create-schedule/getWeeks";
import type { IGame } from "../types";
import { ScheduleTable } from "./ScheduleTable";
import { Loader } from "@libs/ui";

interface INewSeasonFormValues {
  selectedTeams: string[];
  startDate: string;
  endDate: string;
}
export const CreateNewSeason: React.FC = () => {
  const [schedule, setSchedule] = React.useState<IGame[]>();
  const [loadingSchedule, setLoadingSchedule] = React.useState(false);
  const router = useRouter();

  const teams: ITeam[] = useLoaderData({
    from: "/__authenticated/create-new-season"
  });

  const {
    register,
    watch,
    handleSubmit,
    getValues,
    setError,
    formState: { isSubmitting }
  } = useForm<INewSeasonFormValues>();

  const watchedStartDate = watch("startDate");
  const gameDay = watchedStartDate
    ? getDayName(new Date(new Date(watchedStartDate).toUTCString()))
    : "";

  const createAndSetSchedule = async (
    selectedTeams: string[],
    startDate: string,
    endDate: string
  ) => {
    setLoadingSchedule(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    await sleep(1000);
    const generatedSchedule = generateSchedule(
      selectedTeams,
      new Date(startDate),
      new Date(endDate)
    );

    setSchedule(generatedSchedule);
    setLoadingSchedule(false);
  };

  const onRecreateSchedule = async () => {
    const { selectedTeams, startDate, endDate } = getValues();
    await createAndSetSchedule(selectedTeams, startDate, endDate);
  };

  const onConfirmSchedule = async () => {
    const { startDate, endDate } = getValues();
    if (!schedule || schedule.length === 0) return;
    setLoadingSchedule(true);
    try {
      const seasonId = await getSeasonByDates(startDate, endDate);
      await addGamesToSeason(schedule, seasonId);
      // go to the schedule
      await router.navigate({
        to: "/schedule/$seasonId",
        params: { seasonId }
      });
    } catch (error) {
      console.log("Something went wrong...", error);
    } finally {
      setLoadingSchedule(true);
    }
  };

  const onSubmit: SubmitHandler<INewSeasonFormValues> = async ({
    selectedTeams,
    startDate,
    endDate
  }) => {
    if (selectedTeams.length < 2) {
      setError("selectedTeams", {
        type: "selectTwoTeams",
        message: "You must select at least two teams to have a season."
      });
    } else {
      await createSeason(startDate, endDate);
      await createAndSetSchedule(selectedTeams, startDate, endDate);
    }
  };

  if (loadingSchedule) {
    return <Loader />;
  }
  if (schedule) {
    return (
      <>
        <ScheduleTable schedule={schedule} teams={teams} />
        <Stack direction="row" justifyContent="center" gap="5" mt="5">
          <Button
            width="100%"
            variant="solid"
            onClick={() => void onConfirmSchedule()}
          >
            Confirm schedule
          </Button>
          <Button
            width="100%"
            variant="outline"
            onClick={() => void onRecreateSchedule()}
          >
            Recreate schedule
          </Button>
        </Stack>
      </>
    );
  }

  return (
    <>
      <Box
        as="form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Heading as="h2">Create a new season</Heading>
        <FormControl mt="4">
          <Text>Select the teams in the upcoming season:</Text>

          {teams.map(team => (
            <Box key={team.id}>
              <Box
                {...register("selectedTeams")}
                as="input"
                // checked={true}
                id={team.id}
                type="checkbox"
                name="teams"
                value={team.id}
                defaultChecked
              />
              <Box as="label" marginLeft="2" htmlFor={team.id}>
                {team.name}
              </Box>
            </Box>
          ))}
        </FormControl>
        <FormControl mt="4">
          <Text>Select the start and end date of the season</Text>
          <Box mt="4">
            <Text mr="4" as="label" htmlFor="start-date">
              Season start
            </Text>
            <Box
              as="input"
              type="date"
              id="start-date"
              {...register("startDate", {
                required: "Please select an start date."
              })}
            />
            {gameDay && (
              <FormHelperText>
                Games will be played on {gameDay}s
              </FormHelperText>
            )}
          </Box>
          <Box mt="4">
            <Text mr="4" as="label" htmlFor="end-date">
              Season end
            </Text>
            <Box
              as="input"
              type="date"
              id="end-date"
              {...register("endDate", {
                required: "Please select an end date."
              })}
            />
          </Box>
        </FormControl>
        <Box mt="8">
          <Button
            isLoading={isSubmitting}
            width="100%"
            size="lg"
            colorScheme="blue"
            type="submit"
          >
            Create schedule
          </Button>
        </Box>
      </Box>
    </>
  );
};
