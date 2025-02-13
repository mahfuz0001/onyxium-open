"use server";

import { getURL } from "@/utils/Helpers";
import { getAuthTypes } from "@/utils/auth-helpers/settings";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function isValidEmail(email: string) {
  var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

export async function redirectToPath(path: string) {
  return redirect(path);
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      success: false,
      message: "Error: " + error.message,
    };
  }

  return {
    success: true,
    message: "You have been signed out successfully.",
  };
}

export async function signInWithEmail(formData: FormData) {
  const cookieStore = cookies();
  const callbackURL = getURL("/auth/callback");

  const email = String(formData.get("email")).trim();

  if (!isValidEmail(email)) {
    return {
      error: true,
      message: "Invalid email address.",
    };
  }

  const supabase = createClient();
  let options = {
    emailRedirectTo: callbackURL,
    shouldCreateUser: true,
  };

  // If allowPassword is false, do not create a new user
  const { allowPassword } = getAuthTypes();
  if (allowPassword) options.shouldCreateUser = false;
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: options,
  });

  if (error) {
    return {
      error: true,
      message: "Sign in failed: " + error.message,
    };
  } else if (data) {
    cookieStore.set("preferredSignInView", "email_signin", { path: "/" });
    return {
      success: true,
      message: "Please check your email for a sign in link.",
    };
  } else {
    return {
      error: true,
      message: "Hmm... Something went wrong. You could not be signed in.",
    };
  }
}

export async function requestPasswordUpdate(formData: FormData) {
  const callbackURL = getURL("/auth/reset_password");

  // Get form data
  const email = String(formData.get("email")).trim();

  if (!isValidEmail(email)) {
    return {
      error: true,
      message: "Invalid email address.",
    };
  }

  const supabase = createClient();

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: callbackURL,
  });

  if (error) {
    return {
      error: true,
      message: "Password reset email could not be sent: " + error.message,
    };
  } else if (data) {
    return {
      error: false,
      message: "Password reset email sent. Please check your inbox.",
    };
  } else {
    return {
      error: true,
      message:
        "Hmm... Something went wrong. Password reset email could not be sent.",
    };
  }
}

export async function signInWithPassword(formData: FormData) {
  const cookieStore = cookies();
  const email = String(formData.get("email")).trim();
  const password = String(formData.get("password")).trim();

  const supabase = createClient();
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error: true,
      message: "Sign in failed: " + error.message,
    };
  } else if (data.user) {
    cookieStore.set("preferredSignInView", "password_signin", { path: "/" });
    return {
      success: true,
      message: "You are now signed in.",
    };
  } else {
    return {
      error: true,
      message: "Hmm... Something went wrong. You could not be signed in.",
    };
  }
}

export async function signUp(formData: FormData) {
  const callbackURL = getURL("/auth/callback");

  const email = String(formData.get("email")).trim();
  const password = String(formData.get("password")).trim();

  if (!isValidEmail(email)) {
    return {
      error: true,
      message: "Invalid email address.",
    };
  }

  const supabase = createClient();
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: callbackURL,
    },
  });

  if (error) {
    return {
      error: true,
      message: "Sign up failed: " + error.message,
    };
  } else if (data.session) {
    return {
      success: true,
      message: "Signed Up Success. Please verify the link sent to your email.",
    };
  } else if (
    data.user &&
    data.user.identities &&
    data.user.identities.length == 0
  ) {
    return {
      error: true,
      message: "This email address is already in use.",
    };
  } else if (data.user) {
    return {
      success: true,
      message: "Please check your email for a confirmation link.",
    };
  } else {
    return {
      error: true,
      message: "Hmm... Something went wrong. You could not be signed up.",
    };
  }
}

export async function updatePassword(formData: FormData) {
  const newPassword = String(formData.get("newPassword")).trim();
  const confirmPassword = String(formData.get("confirmPassword")).trim();

  // Check that the passwords match
  if (newPassword !== confirmPassword) {
    return {
      error: true,
      message: "Passwords do not match.",
    };
  }

  // Check that the password length is valid
  if (newPassword.length < 6) {
    return {
      error: true,
      message: "Password must be at least 6 characters long.",
    };
  }

  const supabase = createClient();
  const { error, data } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    return {
      error: true,
      message: "Your password could not be updated: " + error.message,
    };
  } else if (data.user) {
    return {
      error: false,
      message: "Your password has been updated successfully.",
    };
  } else {
    return {
      error: true,
      message:
        "Hmm... Something went wrong. Your password could not be updated.",
    };
  }
}

export async function updateEmail(formData: FormData) {
  // Get form data
  const newEmail = String(formData.get("newEmail")).trim();

  // Check that the email is valid
  if (!isValidEmail(newEmail)) {
    return {
      error: true,
      message: "Invalid email address.",
    };
  }

  const supabase = createClient();

  const callbackUrl = getURL(
    "/auth/callback?callbackType=updateEmail&newEmail=" + newEmail
  );

  const { error } = await supabase.auth.updateUser(
    { email: newEmail },
    {
      emailRedirectTo: callbackUrl,
    }
  );

  if (error) {
    return {
      error: true,
      message: error.message,
    };
  } else {
    return {
      error: false,
      message: `Confirmation emails sent. You will need to confirm the update by clicking the links sent to both the old and new email addresses.`,
    };
  }
}

export async function updateName(formData: FormData) {
  const fullName = String(formData.get("fullName")).trim();

  const supabase = createClient();

  const { error: authError, data: authData } = await supabase.auth.updateUser({
    data: { full_name: fullName },
  });

  if (authError) {
    return {
      error: true,
      message:
        "Your name could not be updated in the authentication system: " +
        authError.message,
    };
  }

  const { error: tableError } = await supabase
    .from("users")
    .select("id")
    .limit(1);

  if (tableError && tableError.code === "42P01") {
    // 42P01 is the Postgres error code for "undefined_table"
    return {
      error: true,
      message: "The users table does not exist.",
    };
  }

  const { error: dbError } = await supabase.from("users").upsert(
    {
      id: authData.user.id,
      full_name: fullName,
    },
    {
      onConflict: "id",
      ignoreDuplicates: false,
    }
  );

  if (dbError) {
    if (dbError.code === "42703") {
      // 42703 is the Postgres error code for "undefined_column"
      const { error: alterError } = await supabase.rpc("add_full_name_column");
      if (alterError) {
        return {
          error: true,
          message: "Unable to add full_name column: " + alterError.message,
        };
      }
      const { error: retryError } = await supabase.from("users").upsert(
        {
          id: authData.user.id,
          full_name: fullName,
        },
        {
          onConflict: "id",
          ignoreDuplicates: false,
        }
      );
      if (retryError) {
        return {
          error: true,
          message:
            "Your name could not be updated in the users table: " +
            retryError.message,
        };
      }
    } else {
      return {
        error: true,
        message:
          "Your name could not be updated in the users table: " +
          dbError.message,
      };
    }
  }

  return {
    error: false,
    message: "Your name has been updated successfully.",
  };
}

export async function updateUserPreferences(formData: FormData) {
  const emailNotifications = formData.get("emailNotifications") === "on";
  const language = String(formData.get("language")).trim();

  const supabase = createClient();
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError) {
    return {
      error: true,
      message: "Unable to fetch user: " + userError.message,
    };
  }

  const { error: tableError } = await supabase
    .from("users")
    .select("id")
    .limit(1);
  if (tableError && tableError.code === "42P01") {
    // 42P01 is the Postgres error code for "undefined_table"
    const { error: createError } = await supabase.rpc("create_users_table");
    if (createError) {
      return {
        error: true,
        message: "Unable to create users table: " + createError.message,
      };
    }
  }

  const { error } = await supabase.from("users").upsert(
    {
      id: user.user.id,
      preferences: { emailNotifications, language },
    },
    {
      onConflict: "id",
      ignoreDuplicates: false,
    }
  );

  if (error) {
    if (error.code === "42703") {
      // 42703 is the Postgres error code for "undefined_column"
      const { error: alterError } = await supabase.rpc(
        "add_preferences_column"
      );
      if (alterError) {
        return {
          error: true,
          message: "Unable to add preferences column: " + alterError.message,
        };
      }
      const { error: retryError } = await supabase.from("users").upsert(
        {
          id: user.user.id,
          preferences: { emailNotifications, language },
        },
        {
          onConflict: "id",
          ignoreDuplicates: false,
        }
      );
      if (retryError) {
        return {
          error: true,
          message:
            "Your preferences could not be updated: " + retryError.message,
        };
      }
    } else {
      return {
        error: true,
        message: "Your preferences could not be updated: " + error.message,
      };
    }
  }

  return {
    error: false,
    message: "Your preferences have been updated successfully.",
  };
}

export async function updateProfilePicture(formData: FormData) {
  const profilePicture = formData.get("profilePicture") as File;

  // for (const [key, value] of formData.entries()) {
  //   console.log(`${key}:`, value);
  // }

  if (!profilePicture) {
    return {
      error: true,
      message: "No file was uploaded.",
    };
  }

  // console.log("Profile picture object:", profilePicture);

  if (!profilePicture.name) {
    return {
      error: true,
      message: "Uploaded file does not have a valid name.",
    };
  }

  const fileExt = profilePicture.name.split(".").pop();
  const supabase = createClient();
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      error: true,
      message: "Unable to fetch user: " + userError?.message,
    };
  }

  const fileName = `${user.user.id}-${Math.random()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, profilePicture, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    return {
      error: true,
      message:
        "Profile picture could not be uploaded: " +
        (uploadError.cause || JSON.stringify(uploadError)),
    };
  }

  const { data: urlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);

  const { error: updateError } = await supabase.from("users").upsert(
    [
      {
        id: user.user.id,
        avatar_url: urlData?.publicUrl,
      },
    ],
    {
      onConflict: "id",
    }
  );

  if (updateError) {
    return {
      error: true,
      message:
        "Profile picture URL could not be updated: " +
        (updateError.details || JSON.stringify(updateError)),
    };
  }

  return {
    error: false,
    message: "Your profile picture has been updated successfully.",
    updatedAvatarUrl: urlData?.publicUrl,
  };
}
