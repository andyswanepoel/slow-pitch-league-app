import { Heading, Text, Container } from "@chakra-ui/react";
import { Route } from "@routes/welcome";

export const WelcomePage: React.FC = () => {
  const user = Route.useLoaderData();
  const firstName = user?.first_name;
  console.log("@@@data: ", user);
  return (
    <Container maxW="8xl" py="8">
      <Heading size="2xl">
        {firstName ? `Welcome, ${firstName}!` : "Welcome!"}!
      </Heading>
      <Text fontSize="xl">
        We&apos;re excited to have you here. Check out the links below to
        explore our features and ensure your profile is up-to-date!
      </Text>

      {/* <VStack spacing={4}>
          <Button colorScheme="teal" size="lg" as={RouterLink} to="/explore">
            Explore Features
          </Button>
          <Button colorScheme="yellow" size="lg" as={RouterLink} to="/profile">
            Update Your Profile
          </Button>
        </VStack>

        <Text>
          Need help? Visit our{" "}
          <Link
            as={RouterLink}
            to="/support"
            color="blue.200"
            textDecor="underline"
          >
            Support Center
          </Link>
          .
        </Text> */}
    </Container>
  );
};
