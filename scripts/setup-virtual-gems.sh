#!/bin/bash
# Usage: setup-virtual-gems.sh <path-to-venv>

function main() {
    VIRTUAL_ENV="$1"
    if [[ -z "$VIRTUAL_ENV" ]]; then
        echo "error: Need to specify virtualenv location to install to."
        return 1
    fi

    # These variables are transient, because this script is not sourced.
    GEM_HOME="$VIRTUAL_ENV/gems"
    PATH="$VIRTUAL_ENV/gems/bin:$PATH"

    patchActivationScript
    installDependencies
}

function patchActivationScript() {
    local content=$(cat << END
13a14,17
>     if ! [ -z "\${_OLD_GEM_HOME+_}" ] ; then
>         export GEM_HOME="\$_OLD_GEM_HOME"
>         unset _OLD_GEM_HOME
>     fi
45a50,52
> _OLD_GEM_HOME="\$GEM_HOME"
> export GEM_HOME="\$VIRTUAL_ENV/gems"
> 
47c54
< PATH="\$VIRTUAL_ENV/bin:\$PATH"
---
> PATH="\$VIRTUAL_ENV/gems/bin:\$VIRTUAL_ENV/bin:\$PATH"
END
);

    echo "$content" | patch "$VIRTUAL_ENV/bin/activate"
}

function installDependencies() {
    gem install bundler
    bundler install
}

main "$@"