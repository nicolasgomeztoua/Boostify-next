import {
  Container,
  ImageContainer,
  Paragraph,
  TextBlock,
  TextContainer,
  Title,
  TitleSpan,
  Wrap,
  Button,
} from "./faqStyles";
import Image from "next/image";
import Link from "next/link";

const FaqNew = () => {
  return (
    <Wrap>
      <Container>
        <TextContainer>
          <TextBlock>
            <Title>
              What <TitleSpan>is</TitleSpan> Apex Legends boosting?
            </Title>
            <Paragraph>
              In short, apex legends boosting is a service that lends a hand to
              apex players to achieve difficult and time consuming ranks and
              badges in apex legends. Our boosting services are not only for
              players that still haven&apos;t bloomed into their best apex
              legends form, but also for players that would be out of town and
              can&apos;t grind themselves. While boosting could be frowned upon
              and discouraged, we have helped a lot of our customers to become
              better players through additional services such as streaming and
              duo-carry.
            </Paragraph>
          </TextBlock>
          <TextBlock>
            <Title>
              How will <TitleSpan>Boostify</TitleSpan> boost my account?
            </Title>
            <Paragraph>
              There are no tricks or glitches to it. We boost accounts by
              playing on them LEGITIMATELY, we have the best roster of boosters
              that consists of players with atleast 1 year of boosting
              experience and all-time predators. We have never failed to
              deliver. Give us a try and you will not regret it.
            </Paragraph>
          </TextBlock>
          <TextBlock>
            <Title>
              Will i get banned if I <TitleSpan>use</TitleSpan> Boostify?
            </Title>
            <Paragraph>
              No. We have boosted thousands of accounts over the years, and have
              an impregnable 0% ban rate. This is because we do not use any
              exploits or aimbot or anything that could jeopardize your account.
              We have nothing to hide which is why we provide our streaming
              option to see the boosting process for yourself.
            </Paragraph>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Link
                href={`/Services${
                  typeof window !== "undefined" ? window?.location.search : null
                }`}
                style={{ textDecoration: "none", color: "inherit" }}
                passHref
              >
                <Button background="#40E0D0" color="#fff">
                  Get Started!
                </Button>
              </Link>
            </div>
          </TextBlock>
        </TextContainer>
        <ImageContainer>
          <img alt="lifeline" src={"/assets/images/LifelineFaq.png"} />
        </ImageContainer>
      </Container>
    </Wrap>
  );
};

export default FaqNew;
