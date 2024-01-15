import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Insp from "../Assets/InspSeason.png";

const Discover: React.FunctionComponent = () => {
  let navigate = useNavigate();
  return (
    <Box sx={{ height: "auto", backgroundColor: "#EBE8D8" }}>
      <Container component="div" maxWidth="sm">
        <Grid
          pt={12}
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{
            height: "100%",
            textAlign: "center",
          }}
        >
          <Grid item maxWidth="xs">
            <Box component="div" mt={2}>
              <Typography
                fontSize="20px"
                fontFamily="Lulo-Clean-One-Bold"
                color="black"
                component="h1"
                variant="h5"
              >
                Pisces season{" "}
              </Typography>
            </Box>
            <Box component="div" mt={2}>
              <Typography
                fontSize="12px"
                fontWeight={400}
                lineHeight="122%"
                color="black"
                textAlign="center"
                fontFamily="Open-Sauce-One"
                fontStyle="normal"
                p={1.5}
              >
                Pisces season is upon us! <br />
                <br />
                If you have an important Pisces in your life, you might be
                wondering what to give them for their birthday. After all,
                Pisces is known for its dreamy and elusive nature, which can
                make gift-giving a bit of a challenge.
                <br />
                <br />
                But fear not, for we have some quirky and unconventional gift
                ideas that are sure to delight any little fishy out there.
              </Typography>
            </Box>
            <Box
              mt={7}
              sx={{
                maxWidth: "636px",
              }}
            >
              <img style={{ width: "100%" }} src={Insp}></img>
            </Box>
            <Box component="div">
              <Typography
                fontSize="12px"
                fontWeight={400}
                lineHeight="122%"
                color="black"
                textAlign="center"
                fontFamily="Open-Sauce-One"
                fontStyle="normal"
                p="14%"
              >
                <a
                  href="https://www.akademibokhandeln.se/bok/astrology-self-care-pisces/9781399704915"
                  target="_blank"
                  style={{ color: "black" }}
                >
                  A book about themselves
                </a>{" "}
                - kinda: Pisces are deeply intuitive and spiritual and love to
                indulge in self-care, so a book to give them a greater
                understanding of their own nature could be the perfect gift.
                Encourage them to explore their intuition and connect with their
                inner selves through understanding their zodiac sign.
                <br />
                <br />{" "}
                <a
                  href="https://www.elgiganten.se/product/hem-hushall-tradgard/koksapparater/mixers-blenders/blenders-mixers/vitamix-ascent-2500i-blender-63191-gra/15446"
                  target="_blank"
                  style={{ color: "black" }}
                >
                  A mixer:
                </a>{" "}
                A true Pisces treats their body like a temple, so help them make
                it a smooth and easy habit with their preferred eat-your-greens
                morning routine and encourage them to take some time to pamper
                themselves.
                <br />
                <br />{" "}
                <a
                  href="https://lizalangen.com/tproduct/345914358-763431590741-signature-bouquet-m"
                  target="_blank"
                  style={{ color: "black" }}
                >
                  A bouquet:
                </a>{" "}
                Pisces are known for their love of flowers, nature, and beauty -
                so a gorgeous bouquet could put you on their fav list - but
                choose wisely; they are one picky person when it comes to their
                flower bunts - if you're in it to win it, we suggest a{" "}
                <a
                  href="https://lizalangen.com/weekendbouquet"
                  target="_blank"
                  style={{ color: "black" }}
                >
                  weekly
                </a>{" "}
                flower subscription.
                <br />
                <br /> A personalized{" "}
                <a
                  href="https://open.spotify.com/playlist/3MVuQRF7gtfTTgkMWJ575k"
                  target="_blank"
                  style={{ color: "black" }}
                >
                  playlist:
                </a>{" "}
                Why not create a personalized playlist for them? Include songs
                that reflect their personality and taste.
                <br />
                <br /> A dreamy trip or a
                <a
                  href="https://www.net-a-porter.com/en-se/shop/product/assouline/accessories/books/greek-islands-by-chrysanthos-panas-hardcover-book/43769801097558504"
                  target="_blank"
                  style={{ color: "black" }}
                >
                  dreamy read:
                </a>{" "}
                Their dreamer personality takes them all kinda places, so if you
                want to splurge, we recommend a get-away-anywhere or the next
                best option - a dreamy book for their mind to wander.
                <br />
                <br /> If none of the above sounds appealing and you are still
                hesitant, might we suggest this:
                <br />
                <br /> Ask them what they want, and give it to them.
                <br />
                <br />
                Success guaranteed. <br />
                <br />
                Swim good!
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Discover;
