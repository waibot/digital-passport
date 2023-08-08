## !!! install imagemagick first
# brew install imagemagick

CUR_DIR=
get_cur_dir() {
    # Get the fully qualified path to the script
    case $0 in
        /*)
            SCRIPT="$0"
            ;;
        *)
            PWD_DIR=$(pwd);
            SCRIPT="${PWD_DIR}/$0"
            ;;
    esac
    # Resolve the true real path without any sym links.
    CHANGED=true
    while [ "X$CHANGED" != "X" ]
    do
        # Change spaces to ":" so the tokens can be parsed.
        SAFESCRIPT=`echo $SCRIPT | sed -e 's; ;:;g'`
        # Get the real path to this script, resolving any symbolic links
        TOKENS=`echo $SAFESCRIPT | sed -e 's;/; ;g'`
        REALPATH=
        for C in $TOKENS; do
            # Change any ":" in the token back to a space.
            C=`echo $C | sed -e 's;:; ;g'`
            REALPATH="$REALPATH/$C"
            # If REALPATH is a sym link, resolve it.  Loop for nested links.
            while [ -h "$REALPATH" ] ; do
                LS="`ls -ld "$REALPATH"`"
                LINK="`expr "$LS" : '.*-> \(.*\)$'`"
                if expr "$LINK" : '/.*' > /dev/null; then
                    # LINK is absolute.
                    REALPATH="$LINK"
                else
                    # LINK is relative.
                    REALPATH="`dirname "$REALPATH"`""/$LINK"
                fi
            done
        done

        if [ "$REALPATH" = "$SCRIPT" ]
        then
            CHANGED=""
        else
            SCRIPT="$REALPATH"
        fi
    done
    # Change the current directory to the location of the script
    CUR_DIR=$(dirname "${REALPATH}")
}

get_cur_dir
PROJECT_DIR=$(dirname "$(dirname "${CUR_DIR}")")
DESKTOP_DIR=$PROJECT_DIR/packages/desktop/public/static/images/icons

echo PROJECT_DIR: $PROJECT_DIR
echo DESKTOP_DIR: $DESKTOP_DIR

SRC_PNG=${CUR_DIR}/favicon_web_1024x1024.png
BG_PNG=${CUR_DIR}/desktop/background.png

##=========>>> WEB
sips -z 1024 1024     $SRC_PNG --out $PROJECT_DIR/packages/web/public/static/images/icons/favicon/favicon.png
sips -z 1024 1024     $SRC_PNG --out $PROJECT_DIR/packages/web-embed/public/static/images/icons/favicon/favicon.png

##=========>>> DESKTOP
cd ${DESKTOP_DIR}

mkdir -p icon.iconset
## iconutil --convert iconset icon.icns
#
sips -z 16 16     $SRC_PNG --out icon.iconset/icon_16x16.png
sips -z 32 32     $SRC_PNG --out icon.iconset/icon_16x16@2x.png
sips -z 32 32     $SRC_PNG --out icon.iconset/icon_32x32.png
sips -z 64 64     $SRC_PNG --out icon.iconset/icon_32x32@2x.png
sips -z 128 128   $SRC_PNG --out icon.iconset/icon_128x128.png
sips -z 256 256   $SRC_PNG --out icon.iconset/icon_128x128@2x.png
sips -z 256 256   $SRC_PNG --out icon.iconset/icon_256x256.png
sips -z 512 512   $SRC_PNG --out icon.iconset/icon_256x256@2x.png
sips -z 512 512   $SRC_PNG --out icon.iconset/icon_512x512.png
sips -z 1024 1024   $SRC_PNG --out icon.iconset/icon_512x512@2x.png

iconutil -c icns icon.iconset
rm -rf icon.iconset
cp icon.icns  512x512.icns
sips -z 512 512   $SRC_PNG --out favicon/favicon.png
sips -z 512 512   $SRC_PNG --out 512x512.png
sips -z 320 512   $BG_PNG --out background.png

##=========>>> IOS

IOS_DIR=$PROJECT_DIR/packages/app/ios/OneKeyWallet/Images.xcassets
IOS_ICON_PNG=${CUR_DIR}/ios/icon_1024x1024.png
IOS_SPLASH_PNG=${CUR_DIR}/ios/splash_1284x2778.png

echo "IOS_DIR====>>>: $IOS_DIR"

#
sips -z 2778 1284   $IOS_SPLASH_PNG --out $IOS_DIR/SplashScreen.imageset/image.png
sips -z 1024 1024   $IOS_ICON_PNG --out $IOS_DIR/AppIcon.appiconset/ItunesArtwork@2x.png

sips -z 20 20   $IOS_ICON_PNG --out $IOS_DIR/AppIcon.appiconset/App-Icon-20x20@1x.png
sips -z 40 40   $IOS_ICON_PNG --out $IOS_DIR/AppIcon.appiconset/App-Icon-20x20@2x.png
sips -z 60 60   $IOS_ICON_PNG --out $IOS_DIR/AppIcon.appiconset/App-Icon-20x20@3x.png
#
sips -z 29 29   $IOS_ICON_PNG --out $IOS_DIR/AppIcon.appiconset/App-Icon-29x29@1x.png
sips -z 58 58   $IOS_ICON_PNG --out $IOS_DIR/AppIcon.appiconset/App-Icon-29x29@2x.png
sips -z 87 87   $IOS_ICON_PNG --out $IOS_DIR/AppIcon.appiconset/App-Icon-29x29@3x.png
#
sips -z 40 40   $IOS_ICON_PNG --out $IOS_DIR/AppIcon.appiconset/App-Icon-40x40@1x.png
sips -z 80 80   $IOS_ICON_PNG --out $IOS_DIR/AppIcon.appiconset/App-Icon-40x40@2x.png
sips -z 120 120   $IOS_ICON_PNG --out $IOS_DIR/AppIcon.appiconset/App-Icon-40x40@3x.png
#
sips -z 120 120   $IOS_ICON_PNG --out $IOS_DIR/AppIcon.appiconset/App-Icon-60x60@2x.png
sips -z 180 180   $IOS_ICON_PNG --out $IOS_DIR/AppIcon.appiconset/App-Icon-60x60@3x.png
#
sips -z 76 76   $IOS_ICON_PNG --out $IOS_DIR/AppIcon.appiconset/App-Icon-76x76@1x.png
sips -z 152 152   $IOS_ICON_PNG --out $IOS_DIR/AppIcon.appiconset/App-Icon-76x76@2x.png
sips -z 167 167   $IOS_ICON_PNG --out $IOS_DIR/AppIcon.appiconset/App-Icon-83.5x83.5@2x.png
#
##=========>>> ANDROID
ADR_RES_DIR=$PROJECT_DIR/packages/app/android/app/src/main/res
ADR_SPLASH_PNG=${CUR_DIR}/android/splashscreen_image_1284x2778.png
echo "ADR_RES_DIR====>>>: $ADR_RES_DIR"

#
sips -z 1266 585   $ADR_SPLASH_PNG --out $ADR_RES_DIR/drawable-hdpi/splashscreen_image.png
sips -z 1899 878   $ADR_SPLASH_PNG --out $ADR_RES_DIR/drawable-xhdpi/splashscreen_image.png
sips -z 2778 1284   $ADR_SPLASH_PNG --out $ADR_RES_DIR/drawable-xxhdpi/splashscreen_image.png

sips -z 192 192   $CUR_DIR/android/mipmap-xxxhdpi/ic_launcher.png --out $ADR_RES_DIR/mipmap-xxxhdpi/ic_launcher.png
sips -z 192 192   $CUR_DIR/android/mipmap-xxxhdpi/ic_launcher_round.png --out $ADR_RES_DIR/mipmap-xxxhdpi/ic_launcher_round.png
sips -z 432 432   $CUR_DIR/android/mipmap-xxxhdpi/ic_launcher_background.png --out $ADR_RES_DIR/mipmap-xxxhdpi/ic_launcher_background.png
sips -z 432 432   $CUR_DIR/android/mipmap-xxxhdpi/ic_launcher_foreground.png --out $ADR_RES_DIR/mipmap-xxxhdpi/ic_launcher_foreground.png

sips -z 144 144   $CUR_DIR/android/mipmap-xxhdpi/ic_launcher.png --out $ADR_RES_DIR/mipmap-xxhdpi/ic_launcher.png
sips -z 144 144   $CUR_DIR/android/mipmap-xxhdpi/ic_launcher_round.png --out $ADR_RES_DIR/mipmap-xxhdpi/ic_launcher_round.png
sips -z 324 324   $CUR_DIR/android/mipmap-xxhdpi/ic_launcher_background.png --out $ADR_RES_DIR/mipmap-xxhdpi/ic_launcher_background.png
sips -z 324 324   $CUR_DIR/android/mipmap-xxhdpi/ic_launcher_foreground.png --out $ADR_RES_DIR/mipmap-xxhdpi/ic_launcher_foreground.png

sips -z 96 96   $CUR_DIR/android/mipmap-xxxhdpi/ic_launcher.png --out $ADR_RES_DIR/mipmap-xhdpi/ic_launcher.png
sips -z 96 96   $CUR_DIR/android/mipmap-xxxhdpi/ic_launcher_round.png --out $ADR_RES_DIR/mipmap-xhdpi/ic_launcher_round.png
sips -z 216 216   $CUR_DIR/android/mipmap-xxxhdpi/ic_launcher_background.png --out $ADR_RES_DIR/mipmap-xhdpi/ic_launcher_background.png
sips -z 216 216   $CUR_DIR/android/mipmap-xxxhdpi/ic_launcher_foreground.png --out $ADR_RES_DIR/mipmap-xhdpi/ic_launcher_foreground.png

sips -z 48 48   $CUR_DIR/android/mipmap-xxxhdpi/ic_launcher.png --out $ADR_RES_DIR/mipmap-mdpi/ic_launcher.png
sips -z 48 48   $CUR_DIR/android/mipmap-xxxhdpi/ic_launcher_round.png --out $ADR_RES_DIR/mipmap-mdpi/ic_launcher_round.png
sips -z 108 108   $CUR_DIR/android/mipmap-xxxhdpi/ic_launcher_background.png --out $ADR_RES_DIR/mipmap-mdpi/ic_launcher_background.png
sips -z 108 108   $CUR_DIR/android/mipmap-xxxhdpi/ic_launcher_foreground.png --out $ADR_RES_DIR/mipmap-mdpi/ic_launcher_foreground.png

sips -z 72 72   $CUR_DIR/android/mipmap-xxxhdpi/ic_launcher.png --out $ADR_RES_DIR/mipmap-hdpi/ic_launcher.png
sips -z 72 72   $CUR_DIR/android/mipmap-xxxhdpi/ic_launcher_round.png --out $ADR_RES_DIR/mipmap-hdpi/ic_launcher_round.png
sips -z 162 162   $CUR_DIR/android/mipmap-xxxhdpi/ic_launcher_background.png --out $ADR_RES_DIR/mipmap-hdpi/ic_launcher_background.png
sips -z 162 162   $CUR_DIR/android/mipmap-xxxhdpi/ic_launcher_foreground.png --out $ADR_RES_DIR/mipmap-hdpi/ic_launcher_foreground.png


##=========>>> EXT
EXT_RES_DIR=$PROJECT_DIR/packages/ext/src/assets/img

cp -a $CUR_DIR/ext/* $EXT_RES_DIR/

##=========>>> KIT
KIT_RES_DIR=$PROJECT_DIR/packages/kit/assets

cp $CUR_DIR/ext/logo.svg $KIT_RES_DIR/splash.svg
cp $CUR_DIR/ios/splash_1284x2778.png $KIT_RES_DIR/splash.png
cp -a $CUR_DIR/ext/icon-128.png $EXT_RES_DIR/qrcode_logo.png


##=========>>> Components
CP_RES_DIR=$PROJECT_DIR/packages/components/svg/illus
cp $CUR_DIR/components/* $CP_RES_DIR/

