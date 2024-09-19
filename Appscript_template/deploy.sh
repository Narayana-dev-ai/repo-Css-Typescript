#!/usr/bin/env bash
Color_Off='\033[0m' # Text Reset

# Regular Colors
Black='\033[0;30m'  # Black
Red='\033[0;31m'    # Red
Green='\033[0;32m'  # Green
Yellow='\033[0;33m' # Yellow
Blue='\033[0;34m'   # Blue
Purple='\033[0;35m' # Purple
Cyan='\033[0;36m'   # Cyan
White='\033[0;37m'  # White

# Bold
BBlack='\033[1;30m'  # Black
BRed='\033[1;31m'    # Red
BGreen='\033[1;32m'  # Green
BYellow='\033[1;33m' # Yellow
BBlue='\033[1;34m'   # Blue
BPurple='\033[1;35m' # Purple
BCyan='\033[1;36m'   # Cyan
BWhite='\033[1;37m'  # White

# Underline
UBlack='\033[4;30m'  # Black
URed='\033[4;31m'    # Red
UGreen='\033[4;32m'  # Green
UYellow='\033[4;33m' # Yellow
UBlue='\033[4;34m'   # Blue
UPurple='\033[4;35m' # Purple
UCyan='\033[4;36m'   # Cyan
UWhite='\033[4;37m'  # White

# Background
On_Black='\033[40m'  # Black
On_Red='\033[41m'    # Red
On_Green='\033[42m'  # Green
On_Yellow='\033[43m' # Yellow
On_Blue='\033[44m'   # Blue
On_Purple='\033[45m' # Purple
On_Cyan='\033[46m'   # Cyan
On_White='\033[47m'  # White

# High Intensity
IBlack='\033[0;90m'  # Black
IRed='\033[0;91m'    # Red
IGreen='\033[0;92m'  # Green
IYellow='\033[0;93m' # Yellow
IBlue='\033[0;94m'   # Blue
IPurple='\033[0;95m' # Purple
ICyan='\033[0;96m'   # Cyan
IWhite='\033[0;97m'  # White

# Bold High Intensity
BIBlack='\033[1;90m'  # Black
BIRed='\033[1;91m'    # Red
BIGreen='\033[1;92m'  # Green
BIYellow='\033[1;93m' # Yellow
BIBlue='\033[1;94m'   # Blue
BIPurple='\033[1;95m' # Purple
BICyan='\033[1;96m'   # Cyan
BIWhite='\033[1;97m'  # White

# High Intensity backgrounds
On_IBlack='\033[0;100m'  # Black
On_IRed='\033[0;101m'    # Red
On_IGreen='\033[0;102m'  # Green
On_IYellow='\033[0;103m' # Yellow
On_IBlue='\033[0;104m'   # Blue
On_IPurple='\033[0;105m' # Purple
On_ICyan='\033[0;106m'   # Cyan
On_IWhite='\033[0;107m'  # White

function loading_icon() {
    local load_interval="${1}"
    local loading_message="${2}"
    local elapsed=0
    # local loading_animation=( '⊶⊶⊶⊶O' "⊶⊶⊶o⊷" '⊶⊶o⊷⊷' '⊶o⊷⊷⊷' 'O⊷⊷⊷⊷' '⊶o⊷⊷⊷' '⊶⊶o⊷⊷' "⊶⊶⊶o⊷")
    local loading_animation=(${BWhite}.${Color_Off}${BGreen}.${Color_Off}${BRed}.${Color_Off}${BYellow}.${Color_Off}${BPurple}.${Color_Off}
        ${IWhite}°${Color_Off}${BGreen}.${Color_Off}${BRed}.${Color_Off}${BYellow}.${Color_Off}${BPurple}.${Color_Off}
        ${BWhite}.${Color_Off}${IGreen}°${Color_Off}${BRed}.${Color_Off}${BYellow}.${Color_Off}${BPurple}.${Color_Off}
        ${BWhite}.${Color_Off}${BGreen}.${Color_Off}${IRed}°${Color_Off}${BYellow}.${Color_Off}${BPurple}.${Color_Off}
        ${BWhite}.${Color_Off}${BGreen}.${Color_Off}${BRed}.${Color_Off}${IYellow}°${Color_Off}${BPurple}.${Color_Off}
        ${BWhite}.${Color_Off}${BGreen}.${Color_Off}${BRed}.${Color_Off}${BYellow}.${Color_Off}${IPurple}°${Color_Off})

    echo -n "       ${loading_message}"

    # This part is to make the cursor not blink
    # on top of the animation while it lasts
    tput civis
    trap "tput cnorm" EXIT
    while [ "${load_interval}" -ne "${elapsed}" ]; do
        for frame in "${loading_animation[@]}"; do
            printf "\r"
            printf "${frame}"
            sleep 0.05
        done
        elapsed=$((elapsed + 1))
    done
    printf " \b\n"
}

set -e

# Just a flair. Not actual authorization

loading_icon 1 "Initiating sequence..."

if [ -z "$UAT_ID" ] && [[ $1 != "setup" ]]; then
    echo -e "${BRed}Access denied!${Color_Off}"
    echo -e "${BRed}Please ensure you have the correct variables set.${Color_Off}"
    echo -e "${BCyan}Hint: Run the script with the command 'setup' or 'help' as below:${Color_Off}"
    echo -e "${BGreen}    $0 setup${Color_Off}"
    echo -e "${BGreen}    $0 help${Color_Off}"
    echo -e "${BRed}Exiting...${Color_Off}"
    exit 1
fi

echo -e "${BGreen}Access granted!${Color_Off}"
sleep 0.500
echo -e "\033[5;33mInitializing...\033[0m"
sleep 0.500
echo -e "${On_IGreen}__      __   _                   |${Color_Off}"
echo -e "${On_IGreen}\ \    / /__| |__ ___ _ __  ___  |${Color_Off}"
echo -e "${On_IGreen} \ \/\/ / -_) / _/ _ \    \/ -_) |${Color_Off}"
echo -e "${On_IGreen}  \_/\_/\___|_\__\___/_|_|_\___| .${Color_Off}"

if [ $# -eq 0 ] || [ $1 == "help" ]; then
    echo "Usage: $0 <Command>"
    echo "Commands:"
    echo " The way my script works is that it will search for certain terms in your Command string."
    echo " If it exists, it will perform the said action. For now the below commands exist:"
    echo -e "${BIRed}  uat${Color_Off}: Deploys to the UAT environment"
    echo -e "${BIRed}  ( ⚠ WARNING ⚠ : Business side deployment. Only deploy after testing in dev)${Color_Off}"
    echo -e "${BIGreen}  dev${Color_Off}: Deploys to the DEV environment"
    echo -e "${BIYellow}  test${Color_Off}: Test environment"
    echo -e "${BIBlue}  npx${Color_Off}: Patch for parcel and clasp, because sometimes they are not found for some users"
    echo -e "${BICyan}  crt_off${Color_Off}: Turns off the certificate check for node. Use only if you get certificate errors"
    echo ""
    echo -e "${BIPurple}  setup${Color_Off}: Sets up the environment variables"
    echo -e "${BIPurple}  custom${Color_Off}: ${BIYellow}⚠ WARNING ⚠${Color_Off} : Manually enter deployment description and ID"
    echo "  Example: "
    echo -e "${BGreen}    $0 uat_dev ${Color_Off}"
    echo -e "${BGreen}    $0 dev testnpx ${Color_Off}"
    echo -e "${BGreen}    $0 testuat ${Color_Off}"
    echo -e "${BGreen}    $0 custom${Color_Off}"
    echo "  Note: "
    echo "    If no relevant command is passed, I am just going to parcel build and clasp push it."
    echo "    In the event where parcel build fails, insert npx into the command arguments"
    echo -e "${BIYellow}PLEASE ENSURE YOU USE LOWER CASE. This script is case sensitive!${Color_Off}"
    exit 1
fi

if [[ $1 == *"setup"* ]]; then
    echo -e "${BGreen} Welcome to the setup wizard!${Color_Off}"
    echo -e "${BGreen} We will now set env variables...${Color_Off}"
    echo ""
    echo -e "${BGreen} By default we will assume that your react frontend is in the frontend folder and that${Color_Off}"
    echo -e "${BGreen} your apps script is in the apps-script folder."
    echo ""
    echo -e "${BRed} Your root folder must contain a package.json file and have a command for parcel build.${Color_Off}"
    echo -e "${BRed} By default, we use ${BGreen}pbuild: parcel build frontend/src/index.html --dist-dir ./apps-script${Color_Off}"
    echo -e "${BRed} We advise you to add the above command \"pbuild\" in your package.json for smooth operation${Color_Off}"
    echo -e "${BRed} Do you use a different command?${Color_Off} ${BGreen}[y/N]${Color_Off}"
    read answer </dev/tty
    if [[ $answer = 'y' ]]; then
        echo -e "${BGreen}Please enter the command you use for parcel build${Color_Off}"
        read PARCEL_BUILD </dev/tty
        alias pbuild=$PARCEL_BUILD
    fi
    echo ""
    echo -e "${BGreen} We also recommend that you use a database information object in apps-script that essentially stores your sheet ID.${Color_Off}"
    echo -e "${BGreen} This is to prevent hardcoding of sheet IDs in your code. We for example, use an object like below:${Color_Off}"
    echo ""
    echo -e "${BCyan} var databaseInfo = {${Color_Off}"
    echo -e "${BCyan}     databaseID: \"<Your Sheet ID here>\",${Color_Off}"
    echo -e "${BCyan}     sheet1: \"<Sheet tab 1 name here>\",${Color_Off}"
    echo -e "${BCyan}     sheet2: \"<Sheet tab 2 name here>\",${Color_Off}"
    echo -e "${BCyan}     ... and so on.${Color_Off}"
    echo -e "${BCyan} };${Color_Off}"
    echo ""
    echo -e "${BGreen} This is to provide the illusion of separate environments(Since google apps script does not exactly support isolated envs), we make separate sheets for different environments.${Color_Off}"
    echo -e "${BGreen} So for the purposes of this script, we recommend you to have 3 envs: UAT, DEV and TEST and a separate sheet for each that we will automatically change the id for. (based on your command).${Color_Off}"
    echo ""
    echo -e "${BGreen} Please enter the folder/file name where your sheet ID is stored relative to this script (example: apps-script/ids.js).${Color_Off}"
    read SHEET_ID_FILE </dev/tty
    echo -e "${BGreen} Please enter the UAT Deployment ID:${Color_Off}"
    read UAT_ID </dev/tty
    echo -e "${BGreen} Please enter the UAT Sheet ID:${Color_Off}"
    read UAT_SHEET_ID </dev/tty
    echo -e "${BGreen} Please enter the DEV Deployment ID:${Color_Off}"
    read DEV_ID </dev/tty
    echo -e "${BGreen} Please enter the DEV Sheet ID:${Color_Off}"
    read DEV_SHEET_ID </dev/tty
    echo -e "${BGreen} Please enter the TEST Deployment ID:${Color_Off}"
    read TEST_ID </dev/tty
    echo -e "${BGreen} Please enter the TEST Sheet ID:${Color_Off}"
    read TEST_SHEET_ID </dev/tty
    echo ""
    echo -e "${BGreen} I am assuming that you are using git bash. By default I will add the variables to the .bashrc file${Color_Off}"
    echo -e "${BRed} If you are using a different shell, please add the variables to the correct file manually by copying from ${BGreen}.bashrc ${BRed}.${Color_Off}"
    echo "export SHEET_ID_FILE=\"${SHEET_ID_FILE}\"" >>~/.bashrc
    echo "export UAT_ID=\"${UAT_ID}\"" >>~/.bashrc
    echo "export UAT_SHEET_ID=\"${UAT_SHEET_ID}\"" >>~/.bashrc
    echo "export DEV_ID=\"${DEV_ID}\"" >>~/.bashrc
    echo "export DEV_SHEET_ID=\"${DEV_SHEET_ID}\"" >>~/.bashrc
    echo "export TEST_ID=\"${TEST_ID}\"" >>~/.bashrc
    echo "export TEST_SHEET_ID=\"${TEST_SHEET_ID}\"" >>~/.bashrc
    echo -e "${BCyan} Variables added to .bashrc. It is recommended that you restart your terminal or run the below command to apply the changes manually.${Color_Off}"
    echo ""
    echo -e "${BGreen}  source ~/.bashrc${Color_Off}"
    echo ""
    echo -e "${BCyan} Of course, you can re-run the script but I am unsure if the changes will reflect properly in your bash environment.${Color_Off}"
    echo -e "${BGreen}Exiting...${Color_Off}"
    exit 0
fi

echo -e "${On_IGreen}Attempting git pull${Color_Off}"

if [[ -z $(git status -s) ]]; then
    echo -e "${BIRed}No changes ${Color_Off}to stash."
else
    echo -e "Detected changes in repository. Do you want to stash them? ${BIRed}[y/N]${Color_Off}"
    read answer
    if [[ $answer = 'y' ]]; then
        git add .
        git stash
        echo -e "Do you want to pull the repo? ${BIRed}[Y/n]${Color_Off}"
        read answer
        if [[ $answer = 'n' ]]; then
            echo -e "Exiting.."
            exit 0
        fi
        git pull origin $(git branch | grep \\* | cut -d ' ' -f2)
        git stash pop
        echo -e "${On_IGreen}Pull should be complete. Do you wish to push? (y/N)${Color_Off}"
        read input </dev/tty
        if [ "$input" = 'y' ]; then
            echo -e "${BGreen}Enter commit message... ${Color_Off}"
            read input </dev/tty
            git add .
            git commit -m "${input}"
            git push origin $(git branch | grep \\* | cut -d ' ' -f2)
        fi
        echo -e "${On_IGreen}Push attempted. Do you wish to deploy? (Y/n)${Color_Off}"
        read input </dev/tty
        if [ "$input" = 'n' ]; then
            echo -e "${BGreen}Exiting...${Color_Off}"
            exit 0
        fi
    else
        echo -e "${BIRed}No pull done. To proceed, you must pull the repo.${Color_Off}"
        exit 1
    fi
fi

echo -e "${BGreen}Starting Build without cache...${Color_Off}"
rm -rf frontend/.parcel-cache/
echo -e "${BRed}Ensure that you have a parcel build command in your root package.json file. Here it is pbuild.${Color_Off}"
npm run pbuild
echo -e "${BGreen}Build Complete...${Color_Off}"

if [[ $1 == *"npx"* ]]; then
    echo -e "${BICyan}Running npx...${Color_Off}"
    npx parcel build frontend/src/index.html --dist-dir ./apps-script
    echo -e "${BICyan}npx Complete...${Color_Off}"
    alias clasp="npx clasp"
fi

if [[ $1 == *"crt_off"* ]]; then
    echo -e "${BICyan}Turning off certificate check...${Color_Off}"
    export NODE_TLS_REJECT_UNAUTHORIZED=0
    echo -e "${BICyan}Certificate check turned off...${Color_Off}"
fi

echo -e "${On_IGreen}Build should be complete. Do you wish to deploy? (Y/n)${Color_Off}"
read input </dev/tty

if [ "$input" = 'n' ]; then
    echo -e "${BGreen}Exiting...${Color_Off}"
    exit 0
fi

if [[ $1 == *"uat"* ]]; then
    echo -e "${BRed}Deploying to UAT...${Color_Off}"
    if grep -q "${DEV_SHEET_ID}" "${SHEET_ID_FILE}"; then
        echo -e "${BGreen}Dev env found. Changing to UAT env...${Color_Off}"
        sed -i -e "s/${DEV_SHEET_ID}/${UAT_SHEET_ID}/g" "${SHEET_ID_FILE}"
    fi
    clasp push
    clasp deploy --description UAT --deploymentId $UAT_ID
    echo -e "${BGreen}Deployment Complete. Deleting index.html${Color_Off}"
    git reset --hard HEAD
    exit 0
fi

if [[ $1 == *"dev"* ]]; then
    echo -e "${BGreen}Deploying to DEV...${Color_Off}"
    if grep -q "${UAT_SHEET_ID}" "${SHEET_ID_FILE}"; then
        echo -e "${BGreen}UAT env found. Changing to Dev env...${Color_Off}"
        sed -i -e "s/${UAT_SHEET_ID}/${DEV_SHEET_ID}/g" "${SHEET_ID_FILE}"
    fi
    clasp push
    clasp deploy --description DEV --deploymentId $DEV_ID
    echo -e "${BGreen}Deployment Complete. Deleting index.html${Color_Off}"
    git reset --hard HEAD
    exit 0
fi

if [[ $1 == *"test"* ]]; then
    echo -e "${BYellow}Deploying to TEST...${Color_Off}"
    clasp push
    clasp deploy --description TEST --deploymentId $TEST_ID
    echo -e "${BGreen}Deployment Complete. Deleting index.html${Color_Off}"
    git reset --hard HEAD
    exit 0
fi

if [[ $1 == *"custom"* ]]; then
    echo -e "${BIRed}Deploying to CUSTOM.${Color_Off} ${On_IRed}⚠ Manual mode is on. ⚠${Color_Off}"

    echo "Enter Deployment Description: "
    read deploymentDescription </dev/tty

    echo "Enter Deployment ID: "
    read deploymentId </dev/tty

    clasp deploy --description $deploymentDescription --deploymentId $deploymentId
    echo -e "${BGreen}Deployment Complete...${Color_Off}"
    exit 0
fi

echo "Deployment attempted deleting index.html"