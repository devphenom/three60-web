import React, { CSSProperties } from "react";
import { Flex, Center } from "@chakra-ui/react";

import {
    PankodIcon,
    GithubIcon,
    TwitterIcon,
    YoutubeIcon,
    LinkedinIcon,
} from "@components/icons";

export const Footer: React.FC = () => {
    const iconStyle: CSSProperties = {
        fontSize: 22,
        color: "#fff",
        marginRight: "0.25rem",
        marginLeft: "0.25rem",
    };
    return (
        <Center bg="main.100" py={10}>
            <Flex flexDirection="column">
                <a href="https://github.com/pankod" target="_blank">
                    <PankodIcon color="white" width="140" height="28" />
                </a>
                <Flex mt={5}>
                    <a
                        href="https://github.com/pankod"
                        target="_blank"
                        style={iconStyle}
                    >
                        <GithubIcon color="white" width="28" height="29" />
                    </a>
                    <a
                        href="https://twitter.com/PankodDev"
                        target="_blank"
                        style={iconStyle}
                    >
                        <TwitterIcon color="white" width="28" height="28" />
                    </a>
                    <a
                        href="https://www.youtube.com/channel/UCBGOeQkv1XW3ptryLWlQbAQ"
                        target="_blank"
                        style={iconStyle}
                    >
                        <YoutubeIcon color="white" width="28" height="29" />
                    </a>
                    <a
                        href="https://www.linkedin.com/company/pankod-yazilim-ve-danismanlik/"
                        target="_blank"
                        style={iconStyle}
                    >
                        <LinkedinIcon color="white" width="28" height="32" />
                    </a>
                </Flex>
            </Flex>
        </Center>
    );
};
