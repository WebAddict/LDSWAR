


# mkdir .private
# cd .private
# keytool -genkey -v -keystore LDSWAR.keystore -alias com.ldswar.app -keyalg RSA -keysize 2048 -validity 10000
# Keystore Pass: P58Hp5eUoShRTVoKroCXou6j

# Facebook
keytool -exportcert -alias androiddebugkey -keystore "C:\Projects\LDSWar\.private\LDSWAR.keystore" -storepass P58Hp5eUoShRTVoKroCXou6j -keypass P58Hp5eUoShRTVoKroCXou6j | openssl sha1 -binary | openssl
base64


cordova plugin rm cordova-plugin-console
cordova build --release android

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore "C:\Project\LDSWar\.private\LDSWAR.keystore" platforms/android/build/outputs/apk/android-release-unsigned.apk EMAIL/PACKAGE_NAME/UNIQUE_ID

~/Library/Android/sdk/build-tools/23.0.0/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk signed_releases/APP_NAME_$(date +%F).apk


ionic build android --release -- --keystore="../android.keystore" --storePassword=android --alias=mykey --password=myKeyPassword