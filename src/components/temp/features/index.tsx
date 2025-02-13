import { FaBolt } from "react-icons/fa";
import { Container } from "../container";
import { GradientContainer } from "../gradient-container";
import { Heading } from "../heading";
import { Subheading } from "../subheading";
import {
  Card,
  CardDescription,
  CardSkeletonContainer,
  CardTitle,
} from "./card";
import { FeatureIconContainer } from "./feature-icon-container";
import { SkeletonFive } from "./skeletons/fifth";
import { SkeletonOne } from "./skeletons/first";
import { SkeletonFour } from "./skeletons/fourth";
import { SkeletonTwo } from "./skeletons/second";
import { SkeletonThree } from "./skeletons/third";

export const Features = () => {
  return (
    <GradientContainer className="md:my-20">
      <Container className="py-20 max-w-5xl mx-auto  relative z-40">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <FaBolt className="h-6 w-6 text-cyan-500" />
        </FeatureIconContainer>
        <Heading className="pt-4">Master AI with real-world tools</Heading>
        <Subheading>
          Alvo comes with a set of tools that are perfect for the perfect jobs
          out there.
        </Subheading>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 py-10">
          <Card className="lg:col-span-2">
            <CardTitle>Learn by Using</CardTitle>
            <CardDescription>
              Alvo provides a hands-on experience to learn AI models.
            </CardDescription>
            <CardSkeletonContainer>
              <SkeletonOne />
            </CardSkeletonContainer>
          </Card>
          <Card>
            <CardSkeletonContainer className="max-w-[16rem] mx-auto">
              <SkeletonTwo />
            </CardSkeletonContainer>
            <CardTitle>Track Your Usage</CardTitle>
            <CardDescription>
              Track your usage and improve your AI models.
            </CardDescription>
          </Card>
          <Card>
            <CardSkeletonContainer>
              <SkeletonThree />
            </CardSkeletonContainer>
            <CardTitle>AI Tool Assistant</CardTitle>
            <CardDescription>
              Alvo comes with a tool assistant to help you with your AI models.
            </CardDescription>
          </Card>
          <Card>
            <CardSkeletonContainer
              showGradient={false}
              className="max-w-[16rem] mx-auto"
            >
              <SkeletonFour />
            </CardSkeletonContainer>
            <CardTitle>Explore & Collaborate</CardTitle>
            <CardDescription>
              Explore AI models and collaborate with other users.
            </CardDescription>
          </Card>
          <Card>
            <CardSkeletonContainer>
              <SkeletonFive />
            </CardSkeletonContainer>
            <CardTitle>Know Your Insights</CardTitle>
            <CardDescription>
              Get insights on your AI models and improve them.
            </CardDescription>
          </Card>
        </div>
      </Container>
    </GradientContainer>
  );
};
